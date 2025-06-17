// Firebase SDK setup
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR.firebaseapp.com",
  projectId: "YOUR-ID",
  storageBucket: "YOUR.appspot.com",
  messagingSenderId: "1234567890",
  appId: "APP-ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Booking form handler
if (document.getElementById("bookingForm")) {
  document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const booking = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      type: document.getElementById("eventType").value,
      date: document.getElementById("eventDate").value,
      notes: document.getElementById("notes").value,
      timestamp: new Date()
    };
    await db.collection("bookings").add(booking);
    document.getElementById("msg").innerText = "Booking submitted!";
    e.target.reset();
  });
}

// Admin: Fetch bookings
if (document.getElementById("bookingList")) {
  db.collection("bookings").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let html = "<table border='1'><tr><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Date</th><th>Notes</th></tr>";
    snapshot.forEach(doc => {
      const b = doc.data();
      html += `<tr>
        <td>${b.name}</td>
        <td>${b.email}</td>
        <td>${b.phone}</td>
        <td>${b.type}</td>
        <td>${b.date}</td>
        <td>${b.notes}</td>
      </tr>`;
    });
    html += "</table>";
    document.getElementById("bookingList").innerHTML = html;
  });
}