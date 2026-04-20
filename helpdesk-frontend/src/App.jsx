import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/Styles.css"; 
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import EditTicketPage from "./pages/EditTicketPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { getTickets, saveTickets, resetTickets, clearTickets, fetchTicketsFromBackend, deleteTicketInBackend, closeTicketInBackend } from "./services/ticketService";

function App() {

  // Main shared tickets state
  // Load initial tickets using the service layer
  const [tickets, setTickets] = useState(() => getTickets());

  // Load logged-in user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  // Load tickets from backend when app starts
  useEffect(() => {
    async function loadTickets() {
      try {
        const backendTickets = await fetchTicketsFromBackend();
        setTickets(backendTickets);
      } catch (error) {
        console.error("Backend fetch failed, using local tickets instead:", error);
      }
    }

    loadTickets();
  }, []);

  // Save tickets to localStorage every time tickets change
  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  // Clear all tickets 
  function clearAllTickets() {
    const confirm = window.confirm(
      "Are you sure you want to remove all tickets?"
    );
    if (confirm) {
      const emptyTickets = clearTickets();
      setTickets(emptyTickets);
    }
  }

  // Reset to default tickets
  function resetToDefaults() {
    const confirm = window.confirm(
      "Are you sure you want to remove all tickets?"
    );
    if (confirm) {
      const resetData = resetTickets();
      setTickets(resetData);
    }
  }

  // Adds a new ticket to the tickets array
  function addTicket(newTicket) {
    // Add the new ticket to the end of the tickets array
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  }

  // Lesson 18: delete through backend
  async function deleteTicket(ticketId) {
    try {
      const deleted = await deleteTicketInBackend(ticketId);

      if (deleted) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => String(ticket.id) !== String(ticketId))
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Lesson 18: close through backend
  async function closeTicket(ticketId) {
    try {
      const updatedTicket = await closeTicketInBackend(ticketId);

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          String(ticket.id) === String(ticketId) ? updatedTicket : ticket
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  // Updates a ticket's status to In Progress
  function inProgress(ticketId) {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        String(ticket.id) === String(ticketId) ? { ...ticket, status: "In Progress" } : ticket
      )
    );
  }

  function logoutUser() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="page-container">
          <Navbar currentUser={currentUser} logoutUser={logoutUser} />

          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  tickets={tickets}
                  clearAllTickets={clearAllTickets}
                  resetToDefaults={resetToDefaults}
                  currentUser={currentUser}
                />
              }
            />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

            <Route
              path="/tickets"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <TicketsPage
                    tickets={tickets}
                    deleteTicket={deleteTicket}
                    closeTicket={closeTicket}
                    inProgress={inProgress}
                    clearAllTickets={clearAllTickets}
                    resetToDefaults={resetToDefaults}
                    currentUser={currentUser}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-ticket"
              element={
                <ProtectedRoute currentUser={currentUser} allowedRoles={["EMPLOYEE", "AGENT", "ADMIN"]}>
                  <CreateTicketPage addTicket={addTicket} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tickets/:id"
              element={
                <ProtectedRoute currentUser={currentUser} allowedRoles={["EMPLOYEE", "AGENT", "ADMIN"]}>
                  <TicketDetailsPage tickets={tickets} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tickets/:id/edit"
              element={
                <ProtectedRoute currentUser={currentUser} allowedRoles={["ADMIN", "AGENT"]}>
                  <EditTicketPage
                    tickets={tickets}
                    setTickets={setTickets}
                    currentUser={currentUser}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
//  Delete item from array
// Use:
// filter()

// Update one item in array
// Use:
// map()

// This pattern is used constantly in React.