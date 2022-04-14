// import { User } from "./models/User";
// import { UserEdit } from "./views/UserEdit";

import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";

// const user = User.buildUser({ name: "Name", age: 30 });

// const root = document.getElementById("root");

// if (root) {
// 	const userEdit = new UserEdit(root, user);

// 	userEdit.render();

// 	console.log(userEdit);
// } else {
// 	throw new Error("Root element not found");
// }

const users = new Collection(
	"http://localhost:3000/users",
	(json: UserProps) => {
		return User.buildUser(json);
	}
);

users.on("change", () => {
	const root = document.getElementById("root");

	if (root) {
		new UserList(root, users).render();
	}

	console.log(users);
});

users.fetch();
