import PageHeading from "../components/PageHeading";

function AboutPage() {
    return (
        <div>
            <PageHeading text={"About Page"} />

            <p>
                The IT Support Portal is a help desk ticketing application built to simulate a real internal tool used by organizations to manage technical support requests. The purpose of the app is to give employees a simple way to report technology issues and allow support staff to track, update, and resolve those issues in an organized workflow. </p><br />

            <p>
                In many workplaces, employees experience problems such as printer failures, Wi-Fi issues, email syncing errors, software access problems, or hardware malfunctions. Without a structured system, these requests can be lost in emails, phone calls, or verbal conversations. This app solves that problem by giving users a centralized platform where tickets can be created, monitored, updated, and managed from one place.
            </p><br />

            <p>
                The application supports a realistic ticket lifecycle. A user can create a ticket by entering information such as the title, status, priority, and department. Once created, the ticket appears on the dashboard, where support staff can view all tickets and take action. Tickets can be marked In Progress when work begins, Closed when resolved, or deleted if no longer needed. The dashboard also provides useful summary information such as the total number of tickets, how many are open, in progress, closed, and how many are high or medium priority. This gives the app a practical business purpose rather than making it just a simple practice project.
            </p><br />

            <p>
                The app is designed as a beginner-friendly but realistic software engineering project. It demonstrates core frontend concepts such as React components, props, state management, event handling, conditional rendering, list rendering, and routing. At the same time, it reflects the structure of a real business application by separating the app into reusable components and dedicated pages such as Dashboard, Login, Tickets, and Create Ticket.
            </p>

            <h1>Use of the app</h1>

            <p>The app is intended for:</p>
            <p>- employees who need to report IT problems</p>
            <p>- support agents who need to manage and update tickets</p>
            <p>-administrators or managers who want visibility into ticket activity</p> <br />

        </div>
    );
}

export default AboutPage;