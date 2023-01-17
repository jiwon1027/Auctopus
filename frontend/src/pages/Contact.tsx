import React from "react";
import { Form } from "react-router-dom";

const contactInit = {
  first: "Your",
  last: "Name",
  avatar: "https://placekitten.com/g/200/200",
  twitter: "your_handle",
  notes: "Some notes",
  favorite: true,
};

export default function Contact() {
  return (
    <div id="contact">
      <div>
        <img key={contactInit.avatar} src={contactInit.avatar} />
      </div>

      <div>
        <h1>
          {contactInit.first || contactInit.last ? (
            <>
              {contactInit.first} {contactInit.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contactInit} />
        </h1>

        {contactInit.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contactInit.twitter}`}
              rel="noreferrer"
            >
              {contactInit.twitter}
            </a>
          </p>
        )}

        {contactInit.notes && <p>{contactInit.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

type Props = {
  contact: typeof contactInit;
};

function Favorite({ contact }: Props) {
  // yes, this is a `let` for later
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
