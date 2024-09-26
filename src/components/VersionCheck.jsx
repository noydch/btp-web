import React, { useEffect } from 'react';

const VersionCheck = () => {
    const currentVersion = '1.0.1'; // เวอร์ชันที่แอปกำลังใช้งานu

    useEffect(() => {
        // ตรวจสอบเวอร์ชันที่เก็บใน localStorage
        const storedVersion = localStorage.getItem('appVersion');

        // ถ้าเวอร์ชันที่เก็บใน localStorage ไม่ตรงกับเวอร์ชันปัจจุบัน
        if (storedVersion !== currentVersion) {
            localStorage.setItem('appVersion', currentVersion); // อัปเดตเวอร์ชันใน localStorage
            window.location.reload(); // ทำการรีเฟรชหน้าเว็บ
        }
    }, [currentVersion]); // ถ้า currentVersion เปลี่ยนแปลง ให้รัน useEffect ใหม่

    return <div>Current version: {currentVersion}</div>;
};

export default VersionCheck;
