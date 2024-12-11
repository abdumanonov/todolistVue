import { createApp } from "vue";
import App from "./App.vue";
import BaseButton from "./components/BaseButton.vue";
import FontAwesomeIcon from "./font-awesome";

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
