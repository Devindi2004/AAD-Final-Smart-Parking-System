 // STATE
    let currentRole = 'driver';
    let activeNavItem = null;

    // ROLE SWITCH
    function switchRole(role, btn) {
    currentRole = role;
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('[id^="nav-"]').forEach(n => n.style.display = 'none');
    document.getElementById('nav-' + role).style.display = 'block';

    const titles = { driver: 'Driver Dashboard', owner: 'Owner Dashboard', admin: 'Admin Dashboard' };
    const names = { driver: 'Kasun Madushan', owner: 'Ruwan Silva', admin: 'Admin Agent' };
    const initials = { driver: 'KM', owner: 'RS', admin: 'AA' };
    const roles = { driver: 'Driver', owner: 'Parking Owner', admin: 'System Admin' };

    document.getElementById('topbar-title').textContent = titles[role];
    document.getElementById('sidebar-name').textContent = names[role];
    document.getElementById('sidebar-role').textContent = roles[role];
    document.getElementById('sidebar-avatar').textContent = initials[role];

    const firstView = { driver: 'driver-dashboard', owner: 'owner-dashboard', admin: 'admin-dashboard' };

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(firstView[role]).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItems = document.getElementById('nav-' + role).querySelectorAll('.nav-item');
    if (navItems.length) navItems[0].classList.add('active');
}

    // SHOW VIEW
    function showView(viewId, navEl) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(viewId);
    if (view) view.classList.add('active');

    if (navEl) {
    const parent = navEl.closest('[id^="nav-"]');
    if (parent) parent.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navEl.classList.add('active');
}

    const titleMap = {
    'driver-dashboard': 'Driver Dashboard',
    'driver-map': 'Find Parking',
    'driver-vehicles': 'My Vehicles',
    'driver-bookings': 'Booking History',
    'driver-qr': 'My QR Code',
    'owner-dashboard': 'Owner Dashboard',
    'owner-slots': 'Parking Slots',
    'owner-requests': 'Appointment Requests',
    'owner-scan': 'Scan QR Code',
    'owner-earnings': 'Earnings',
    'admin-dashboard': 'Admin Dashboard',
    'admin-users': 'User Management',
    'admin-verify': 'Verify Owners',
    'admin-appointments': 'All Appointments',
    'admin-commission': 'Commission Tracking',
    'admin-analytics': 'Analytics & Reports'
};

    document.getElementById('topbar-title').textContent = titleMap[viewId] || 'ParkSmart';
}

    // PRICE CALCULATOR
    function calcPrice() {
    const start = document.querySelector('input[type=time]');
    const end = document.querySelectorAll('input[type=time]')[1];
    if (!start || !end) return;

    const [sh, sm] = start.value.split(':').map(Number);
    const [eh, em] = end.value.split(':').map(Number);
    const hours = ((eh * 60 + em) - (sh * 60 + sm)) / 60;

    if (hours <= 0) return;

    // Bike pricing rule
    let total = hours <= 3 ? 100 : 100 + ((hours - 3) * 50);
    const commission = total * 0.20;

    const durEl = document.getElementById('price-duration');
    const totEl = document.getElementById('price-total');
    const comEl = document.getElementById('price-commission');

    if (durEl) durEl.textContent = hours.toFixed(1) + ' hours';
    if (totEl) totEl.textContent = Math.round(total) + ' LKR';
    if (comEl) comEl.textContent = Math.round(commission) + ' LKR';
}

    // TAB BUTTONS
    document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

    // Vehicle card selection
    document.querySelectorAll('.vehicle-card').forEach(card => {
    if (!card.querySelector('.vehicle-check')) return;
    card.addEventListener('click', function() {
    const siblings = this.parentElement.querySelectorAll('.vehicle-card');
    siblings.forEach(s => s.classList.remove('selected'));
    this.classList.add('selected');
});
});
    // ================= BACKEND API BASE =================
    const API_BASE = "http://localhost:8080/api";


    // ================= LOAD VEHICLES =================
    async function loadVehicles(){

    try{

    const res = await fetch(API_BASE + "/vehicles");
    const vehicles = await res.json();

    const grid = document.querySelector("#driver-vehicles .vehicle-grid");

    if(!grid) return;

    grid.innerHTML = "";

    vehicles.forEach(v => {

    grid.innerHTML += `
            <div class="vehicle-card">
                <div class="vehicle-type-icon">🚗</div>
                <div class="vehicle-number">${v.vehicleNumber}</div>
                <div class="vehicle-detail">${v.model} · ${v.color}</div>
            </div>
            `;

});

}catch(e){
    console.error("Vehicle load error", e);
}

}


    // ================= ADD VEHICLE =================
    async function addVehicle(){

    const number = document.querySelector("input[placeholder='e.g. CBC 1234']").value;
    const model = document.querySelector("input[placeholder='e.g. Toyota Aqua']").value;
    const color = document.querySelector("input[placeholder='e.g. Blue']").value;
    const year = document.querySelector("input[placeholder='e.g. 2021']").value;
    const type = document.querySelector("select").value;

    const vehicle = {
    vehicleNumber:number,
    model:model,
    color:color,
    year:year,
    type:type,
    driverId:1
};

    await fetch(API_BASE + "/vehicles",{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
},
    body:JSON.stringify(vehicle)
});

    loadVehicles();

}


    // ================= LOAD BOOKINGS =================
    async function loadBookings(){

    const res = await fetch(API_BASE + "/appointments");
    const bookings = await res.json();

    const table = document.querySelector("#driver-bookings tbody");

    if(!table) return;

    table.innerHTML="";

    bookings.forEach(b=>{

    table.innerHTML+=`
        <tr>
            <td>#${b.bookingCode}</td>
            <td>${b.slotId}</td>
            <td>${b.vehicleId}</td>
            <td>${b.startTime}</td>
            <td>${b.duration}h</td>
            <td>${b.totalAmount} LKR</td>
            <td>${b.status}</td>
            <td>-</td>
        </tr>
        `;

});

}


    // ================= CREATE BOOKING =================
    async function createBooking(){

    const booking = {

    bookingCode:"PS-"+Date.now(),
    startTime:"2026-03-07T10:00:00",
    endTime:"2026-03-07T13:00:00",
    duration:3,
    totalAmount:300,
    commission:60,
    status:"PENDING",
    driverId:1,
    slotId:1,
    vehicleId:1

};

    await fetch(API_BASE + "/appointments",{

    method:"POST",
    headers:{
    "Content-Type":"application/json"
},
    body:JSON.stringify(booking)

});

    alert("Booking Created");

    loadBookings();

}


    // ================= LOAD SLOTS =================
    async function loadSlots(){

    const res = await fetch(API_BASE + "/slots");
    const slots = await res.json();

    console.log("Slots:",slots);

}


    // ================= PAGE LOAD =================
    document.addEventListener("DOMContentLoaded",()=>{

    loadVehicles();
    loadBookings();
    loadSlots();

});