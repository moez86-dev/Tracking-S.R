// إضافة مندوب جديد وحفظ البيانات في Local Storage
document.getElementById('addRepForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let repCode = document.getElementById('repCode').value;
    let repName = document.getElementById('repName').value;
    let repPhone = document.getElementById('repPhone').value;
    let repCity = document.getElementById('repCity').value;
    let repSalary = document.getElementById('repSalary').value;
    let repTarget = document.getElementById('repTarget').value;
    let repActualSales = document.getElementById('repActualSales').value;

    let reps = JSON.parse(localStorage.getItem('representatives')) || [];
    reps.push({
        code: repCode,
        name: repName,
        phone: repPhone,
        city: repCity,
        salary: repSalary,
        target: repTarget,
        actualSales: repActualSales
    });

    localStorage.setItem('representatives', JSON.stringify(reps));

    document.getElementById('addRepForm').reset();
    displayReps();
});

// عرض قائمة مندوبين المبيعات
function displayReps() {
    let repsList = document.getElementById('repsList');
    repsList.innerHTML = '';

    let reps = JSON.parse(localStorage.getItem('representatives')) || [];
    reps.forEach(function(rep, index) {
        let difference = rep.actualSales - rep.target;
        let differenceClass = difference >= 0 ? 'success' : 'failure';
        let differenceText = difference >= 0 ? `+${difference}` : `${difference} - Target not achieved`;

        let row = `<tr>
                    <td>${rep.code}</td>
                    <td>${rep.name}</td>
                    <td>${rep.phone}</td>
                    <td>${rep.city}</td>
                    <td>${rep.salary}</td>
                    <td>${rep.target}</td>
                    <td>${rep.actualSales}</td>
                    <td class="${differenceClass}">${differenceText}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteRep(${index})">Delete</button>
                    </td>
                </tr>`;
        repsList.innerHTML += row;
    });
}

// حذف مندوب مبيعات
function deleteRep(index) {
    let reps = JSON.parse(localStorage.getItem('representatives')) || [];
    reps.splice(index, 1);
    localStorage.setItem('representatives', JSON.stringify(reps));
    displayReps();
}

// عرض المندوبين عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayReps);

// إدارة الحضور
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let repNameAttendance = document.getElementById('repNameAttendance').value;
    let attendanceDate = document.getElementById('attendanceDate').value;
    let attendanceStatus = document.getElementById('attendanceStatus').value;

    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    attendance.push({name: repNameAttendance, date: attendanceDate, status: attendanceStatus});

    localStorage.setItem('attendance', JSON.stringify(attendance));

    document.getElementById('attendanceForm').reset();
    displayAttendance();
});

// عرض قائمة الحضور
function displayAttendance() {
    let attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    attendance.forEach(function(entry) {
        let row = `<tr>
                    <td>${entry.name}</td>
                    <td>${entry.date}</td>
                    <td>${entry.status}</td>
                </tr>`;
        attendanceList.innerHTML += row;
    });
}

// عرض الحضور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayAttendance);

// حساب العمولات
document.getElementById('commissionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let repNameCommission = document.getElementById('repNameCommission').value;
    let salesAmount = document.getElementById('salesAmount').value;

    // افتراض نسبة العمولة 10%
    let commission = salesAmount * 0.1;

    let commissions = JSON.parse(localStorage.getItem('commissions')) || [];
    commissions.push({name: repNameCommission, salesAmount: salesAmount, commission: commission});

    localStorage.setItem('commissions', JSON.stringify(commissions));

    document.getElementById('commissionForm').reset();
    displayCommissions();
});

// عرض قائمة العمولات
function displayCommissions() {
    let commissionList = document.getElementById('commissionList');
    commissionList.innerHTML = '';

    let commissions = JSON.parse(localStorage.getItem('commissions')) || [];
    commissions.forEach(function(entry) {
        let row = `<tr>
                    <td>${entry.name}</td>
                    <td>${entry.salesAmount}</td>
                    <td>${entry.commission}</td>
                </tr>`;
        commissionList.innerHTML += row;
    });
}

// عرض العمولات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayCommissions);
