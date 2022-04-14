import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const user = User.buildUser({ name: "Sarvesh", age: 22 });

const root = document.getElementById("root");

if (root) {
	const userF = new UserForm(root, user);

	userF.render();
} else {
	throw new Error("Root element not found!");
}
