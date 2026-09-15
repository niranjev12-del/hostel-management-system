const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./hostel.db');
db.serialize(()=>{
db.run(`CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT,student_id TEXT UNIQUE NOT NULL,name TEXT NOT NULL,email TEXT,phone TEXT,course TEXT,year TEXT,address TEXT,room_number TEXT,password TEXT NOT NULL)`);
db.run(`CREATE TABLE IF NOT EXISTS rooms(id INTEGER PRIMARY KEY AUTOINCREMENT,room_number TEXT UNIQUE NOT NULL,capacity INTEGER NOT NULL,occupied INTEGER DEFAULT 0)`);
db.run(`CREATE TABLE IF NOT EXISTS fees(id INTEGER PRIMARY KEY AUTOINCREMENT,student_id TEXT NOT NULL,amount REAL NOT NULL,due_date TEXT NOT NULL,status TEXT DEFAULT 'Pending')`);
db.run(`CREATE TABLE IF NOT EXISTS complaints(id INTEGER PRIMARY KEY AUTOINCREMENT,student_id TEXT NOT NULL,subject TEXT NOT NULL,description TEXT NOT NULL,status TEXT DEFAULT 'Pending',date TEXT NOT NULL)`);
db.run(`CREATE TABLE IF NOT EXISTS mess(id INTEGER PRIMARY KEY AUTOINCREMENT,day TEXT NOT NULL,breakfast TEXT,lunch TEXT,dinner TEXT)`);
db.run(`CREATE TABLE IF NOT EXISTS attendance(id INTEGER PRIMARY KEY AUTOINCREMENT,student_id TEXT NOT NULL,date TEXT NOT NULL,status TEXT NOT NULL,remarks TEXT DEFAULT '',UNIQUE(student_id,date))`);
db.run(`INSERT OR IGNORE INTO rooms(room_number,capacity,occupied) VALUES('101',4,2),('102',4,4),('103',3,1)`);
db.run(`INSERT OR IGNORE INTO students(student_id,name,email,phone,course,year,address,room_number,password) VALUES('STU001','Rahul Kumar','rahul@example.com','9876543210','B.Tech Computer Science with Data Science','1st Year','Kerala','101','student123')`);
db.run(`INSERT OR IGNORE INTO students(student_id,name,email,phone,course,year,address,room_number,password) VALUES('STU002','Anjali S','anjali@example.com','9876501234','B.Tech Computer Science with Data Science','1st Year','Kerala','101','student123')`);
db.get('SELECT COUNT(*) c FROM fees',(e,r)=>{if(!e&&!r.c){db.run("INSERT INTO fees(student_id,amount,due_date,status) VALUES('STU001',25000,'2026-10-01','Pending')");db.run("INSERT INTO fees(student_id,amount,due_date,status) VALUES('STU002',25000,'2026-10-01','Paid')")}});
db.get('SELECT COUNT(*) c FROM attendance',(e,r)=>{if(!e&&!r.c){let a=[['STU001','2026-09-01','Present',''],['STU001','2026-09-02','Present',''],['STU001','2026-09-03','Absent','Sick leave'],['STU001','2026-09-04','Late','Arrived after 9:00 AM'],['STU002','2026-09-01','Present',''],['STU002','2026-09-02','Present',''],['STU002','2026-09-03','Present',''],['STU002','2026-09-04','Present','']];let ains=db.prepare('INSERT OR IGNORE INTO attendance(student_id,date,status,remarks) VALUES(?,?,?,?)');a.forEach(x=>ains.run(x));ains.finalize()}});
db.get('SELECT COUNT(*) c FROM mess',(e,r)=>{if(!e&&!r.c){let m=[['Monday','Idli & Sambar','Rice & Chicken Curry','Chapathi & Vegetable Curry'],['Tuesday','Dosa & Chutney','Rice & Fish Curry','Fried Rice'],['Wednesday','Poori & Masala','Rice & Dal','Chapathi & Chicken Curry'],['Thursday','Appam & Egg Curry','Rice & Fish Fry','Noodles'],['Friday','Idli & Sambar','Biriyani','Chapathi & Dal'],['Saturday','Dosa & Chutney','Rice & Chicken Curry','Fried Rice'],['Sunday','Puttu & Kadala','Special Biriyani','Chapathi & Chicken Curry']];let s=db.prepare('INSERT INTO mess(day,breakfast,lunch,dinner) VALUES(?,?,?,?)');m.forEach(x=>s.run(x));s.finalize()}});
});
module.exports=db;
