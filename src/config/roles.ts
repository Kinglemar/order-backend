const allRoles = {
  user: [
    "updateParcel",
    "createParcel",
    "getParcel",
    "getParcels",
    "getVehicle",
    "getCouriers",
  ],
  courier: [
    "getUsers",
    "updateParcel",
    "updateCourier",
    "createParcel",
    "getParcel",
    "getParcels",
    "getVehicle",
    "updateVehicle",
    "setPrice",
    "vehicleDocumentation"
  ],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[] | never[]> = new Map(
  Object.entries(allRoles)
);
