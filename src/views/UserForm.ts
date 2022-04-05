import { User } from "../models/User";

export class UserForm {
	constructor(public parent: Element, public model: User) {
		this.bindModel();
	}

	bindModel(): void {
		this.model.on("change", () => {
			this.render();
		});
	}

	eventsMap(): { [key: string]: () => void } {
		return {
			"click:.click-me": this.onButtonClick,
			"mouseenter:h1": this.onHeaderHover,
			"click:.set-age": this.onSetAge,
		};
	}

	onSetAge = (): void => {
		this.model.setRandomAge();
	};

	onHeaderHover(): void {
		console.log("H1 was hovered over");
	}

	onButtonClick(): void {
		console.log("Hi there");
	}

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
				<div>User name: ${this.model.get("name")}</div>
				<div>User Age: ${this.model.get("age")}</div>
        <input/>
				
        <button class="click-me">CLick ME</button>
				<button class="set-age">Set Random Age</button>
      </div>
    `;
	}

	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(":");

			fragment.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}

	render(): void {
		this.parent.innerHTML = "";
		const templateElement = document.createElement("template");

		templateElement.innerHTML = this.template();

		this.bindEvents(templateElement.content);

		this.parent.append(templateElement.content);
	}
}
