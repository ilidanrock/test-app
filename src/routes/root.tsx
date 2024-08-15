import { getContacts, createContact } from "@/contacts";
import { Link, useLoaderData, Form} from "react-router-dom";
import { Outlet } from "react-router-dom";

interface Params {
  contactId?: string;
}

// Define the main structure
export interface MainStructure {
  request: Request; // Using the Request interface from the Fetch API
  params: Params;
  context?: string; // Can adjust the type based on your use case
}

export async function loader(query : MainStructure) {

  
  const contacts = await getContacts(query);
  
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}


export default function Root() {
  const { contacts } = useLoaderData() as { contacts: {
    id: string;
    first: string;
    last: string;
    favorite: boolean;
  }[] };
  

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail">
        <Outlet />
        </div>
      </>
    );
  }