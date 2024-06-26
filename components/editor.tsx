"use client";
import { updatePost, updatePostMetadata } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Category, Post } from "@prisma/client";
import { ExternalLink, InfoIcon } from "lucide-react";
import { Editor as NovelEditor } from "novel";
import { useEffect, useRef, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import LoadingDots from "./icons/loading-dots";

type PostWithSite = Post & { site: { subdomain: string | null } | null };

export default function Editor({
  post,
  categories,
}: {
  post: PostWithSite;
  categories: Category[];
}) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState<PostWithSite>(post);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleDebounceChange = (e: string, field: string) => {
    setIsChanged(true);
    setData({ ...data, [field]: e });

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(async () => {
      await updatePost({ ...data, [field]: e });
      setIsChanged(false);
    }, 300);
  };

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey && e.key === "s") || (e.ctrlKey && e.key === "s")) {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePost(data);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-amber-100 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-stone-700">
      <PostButtons
        data={data}
        setData={setData}
        isChanged={isChanged}
        isPendingSaving={isPendingSaving}
        setIsChanged={setIsChanged}
        post={post}
        startTransitionSaving={startTransitionSaving}
      />
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={post?.title || ""}
          autoFocus
          onChange={(e) => handleDebounceChange(e.currentTarget.value, "title")}
          className="dark:placeholder-text-600 border-none bg-transparent px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:text-white"
        />

        <TextareaAutosize
          name="description"
          placeholder="Description"
          defaultValue={post?.description || ""}
          onChange={(e) =>
            handleDebounceChange(e.currentTarget.value, "description")
          }
          className="dark:placeholder-text-600 w-full resize-none border-none bg-transparent px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:text-white"
        />

        <select
          title="post category"
          defaultValue={post?.category || ""}
          onChange={(e) =>
            handleDebounceChange(e.currentTarget.value, "category")
          }
          className="dark:placeholder-text-600 w-fit rounded border border-stone-200 bg-transparent px-4 py-2 placeholder:text-stone-400 hover:cursor-pointer focus:outline-none focus:ring-0 dark:text-white"
        >
          <option>Choose Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name} className="px-2">
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="tldr" className="text-sm font-semibold text-stone-400">
          (Brief summary)
        </label>
        <TextareaAutosize
          name="tldr"
          placeholder="Brief summary of your post (optional)"
          defaultValue={post?.summary || ""}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none rounded border-none bg-stone-100 p-4  placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor
        className="relative block"
        defaultValue={post?.content || undefined}
        onUpdate={(editor) => {
          setData((prev) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        onDebouncedUpdate={() => {
          if (
            data.title === post.title &&
            data.description === post.description &&
            data.content === post.content &&
            data.summary === post.summary &&
            data.category === post.category
          ) {
            return;
          }
          startTransitionSaving(async () => {
            await updatePost(data);
            setIsChanged(false);
          });
        }}
      />
    </div>
  );
}

interface PostButtonsProps {
  data: PostWithSite;
  setData: React.Dispatch<React.SetStateAction<PostWithSite>>;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  startTransitionSaving: (callback: () => Promise<void>) => void;
  isPendingSaving: boolean;
  post: PostWithSite;
}

const PostButtons = ({
  data,
  setData,
  isChanged,
  isPendingSaving,
  post,
}: PostButtonsProps) => {
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [showImageInfo, setShowImageInfo] = useState(false);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
    : `http://${data.site?.subdomain}.localhost:3000/${data.slug}`;

  return (
    <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
      {data.published && (
        <a
          title="View Post"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
        {isChanged
          ? "Unsaved Changes"
          : isPendingSaving
          ? "Saving..."
          : "Saved"}
      </div>

      <button
        onClick={() => {
          const formData = new FormData();
          formData.append("published", String(!data.published));
          startTransitionPublishing(async () => {
            await updatePostMetadata(formData, post.id, "published").then(
              () => {
                toast.success(
                  `Successfully ${
                    data.published ? "unpublished" : "published"
                  } your post.`,
                );
                setData((prev) => ({ ...prev, published: !prev.published }));
              },
            );
          });
        }}
        className={cn(
          "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
          isPendingPublishing
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPendingPublishing}
      >
        {isPendingPublishing ? (
          <LoadingDots />
        ) : (
          <p>{data.published ? "Unpublish" : "Publish"}</p>
        )}
      </button>
      <div
        className="relative"
        onMouseEnter={() => setShowImageInfo(true)}
        onMouseLeave={() => setShowImageInfo(false)}
      >
        <button
          title="image info"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50"
        >
          <InfoIcon size={16} className="text-amber-500" />
        </button>
        <div
          className={cn(
            "absolute right-0 top-full z-10 w-60 min-w-full rounded-lg border border-stone-200 bg-white p-4 shadow-lg dark:border-stone-700 dark:bg-stone-800",
            showImageInfo ? "block" : "hidden",
          )}
        >
          <p className="min-w-full">
            <span className="text-sm font-semibold">
              You can add a post image in the settings tab
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
