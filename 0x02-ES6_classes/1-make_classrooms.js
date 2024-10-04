import ClassRoom from "./0-classroom.js";

export default function initializeRooms() {
    let room1 = new ClassRoom(19);
    let room2 = new ClassRoom(20);
    let room3 = new ClassRoom(34);
    return [room1, room2, room3];
};
