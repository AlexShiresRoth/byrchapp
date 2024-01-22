/***
 * @todo: Need to determine between readers and authors
 * @abstract: Or should everyone just be able to read and write? and then
 * @abstract: we just highlight active authors?
 */

import UserAvatarAndName from "@/components/user-avatar-name";

type AuthorType<T> = {
  name: T;
  image: T;
  href: T;
  bio: T;
  id: number;
};

const fakeAuthorData: AuthorType<string>[] = [
  {
    name: "Maxwell Quill",
    bio: "Crafting tales that tickle the imagination and dance with words.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww",
    id: 1,
    href: "maxwell_quill_page_link",
  },
  {
    name: "Scarlett Witshine",
    bio: "Weaving words into stories that sparkle and provoke laughter.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww",
    id: 2,
    href: "scarlett_witshine_page_link",
  },
  {
    name: "Professor Quirkington",
    bio: "Unraveling the mysteries of the universe with a touch of eccentricity.",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww",
    id: 3,
    href: "professor_quirkington_page_link",
  },
  {
    name: "Luna Jesterton",
    bio: "Poetry that dances in moonlight, casting spells of whimsy and wonder.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww",
    id: 4,
    href: "luna_jesterton_page_link",
  },
];

const Authors = () => {
  return (
    <section className="flex min-h-full w-1/3 flex-col items-center py-12">
      <div className=" sticky top-20 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold text-stone-800">
          Featured Authors
        </h2>
        <div className="flex flex-col gap-6">
          {fakeAuthorData.map((author) => {
            return (
              <div key={author.id} className="flex flex-col">
                <UserAvatarAndName image={author.image} name={author.name} />
                <div>
                  <p className="max-w-sm text-stone-500">{author.bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Authors;
