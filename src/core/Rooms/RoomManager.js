import Room from "./Room";

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomData) {
    const room =
      roomData instanceof Room
        ? roomData
        : new Room(roomData);

    if (this.rooms.has(room.getId())) {
      throw new Error(
        `La sala "${room.getId()}" ya existe.`
      );
    }

    this.rooms.set(room.getId(), room);

    return room;
  }

  getRoom(id) {
    return this.rooms.get(id) ?? null;
  }

  getRooms() {
    return [...this.rooms.values()];
  }

  removeRoom(id) {
    return this.rooms.delete(id);
  }

  exists(id) {
    return this.rooms.has(id);
  }

  getCount() {
    return this.rooms.size;
  }

  clear() {
    this.rooms.clear();
  }
}

export default RoomManager;