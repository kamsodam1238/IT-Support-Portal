// Default tickets used only if nothing exists in localStorage yet
  const defaultTickets = [
    {
      id: 1,
      title: "Printer not working",
      status: "Open",
      priority: "High",
      department: "IT",
      submittedBy: "Samuel Kareem",
      createdAt: "4/1/2026, 9:00:00 AM"
    },
    {
      id: 2,
      title: "Cannot connect to Wi-Fi",
      status: "In Progress",
      priority: "Medium",
      department: "IT",
      submittedBy: "IT Staff",
      createdAt: "4/2/2026, 9:00:00 AM"
    },
    {
      id: 3,
      title: "Laptop screen flickering",
      status: "Closed",
      priority: "Low",
      department: "Finance",
      submittedBy: "Finance Team",
      createdAt: "4/3/2026, 2:30:00 PM"
    },
    {
      id: 4,
      title: "Email not syncing",
      status: "Open",
      priority: "High",
      department: "HR",
      submittedBy: "HR Team",
      createdAt: "4/4/2026, 2:30:00 PM"
    }
  ];

  export default defaultTickets;