export const bloodCompatibilityData = {
  "O-": {
    donateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    receiveFrom: ["O-"],
    specialClassification: "Universal Donor (Red Cells)",
  },
  "O+": {
    donateTo: ["O+", "A+", "B+", "AB+"],
    receiveFrom: ["O+", "O-"],
    specialClassification: "—",
  },
  "A-": {
    donateTo: ["A-", "A+", "AB-", "AB+"],
    receiveFrom: ["A-", "O-"],
    specialClassification: "—",
  },
  "A+": {
    donateTo: ["A+", "AB+"],
    receiveFrom: ["A+", "A-", "O+", "O-"],
    specialClassification: "—",
  },
  "B-": {
    donateTo: ["B-", "B+", "AB-", "AB+"],
    receiveFrom: ["B-", "O-"],
    specialClassification: "—",
  },
  "B+": {
    donateTo: ["B+", "AB+"],
    receiveFrom: ["B+", "B-", "O+", "O-"],
    specialClassification: "—",
  },
  "AB-": {
    donateTo: ["AB-", "AB+"],
    receiveFrom: ["AB-", "A-", "B-", "O-"],
    specialClassification: "Universal Plasma Donor",
  },
  "AB+": {
    donateTo: ["AB+"],
    receiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    specialClassification: "Universal Recipient",
  },
};

export function getBloodCompatibility(bloodGroup) {
  return bloodCompatibilityData[bloodGroup]?.receiveFrom || [];
}

export function getBloodCompatibilityDetails(bloodGroup) {
  return bloodCompatibilityData[bloodGroup] || null;
}
