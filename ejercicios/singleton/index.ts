import Singleton from "./Singleton";

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a == b);
