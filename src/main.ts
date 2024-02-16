import { createApp } from "vue";
import ElementPlus from "element-plus";
import VXETable from "vxe-table";
import "element-plus/dist/index.css";
import "vxe-table/lib/style.css";
import App from "./App.vue";

createApp(App).use(ElementPlus).use(VXETable).mount("#app");
