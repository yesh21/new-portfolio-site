import React, { useState, useEffect } from 'react';


const SystemInfo = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(null);
  const [ipAddress, setIpAddress] = useState('Loading...');

  useEffect(() => {
    // Battery Info
    let battery = null;

    const updateBatteryInfo = (bat) => {
      setBatteryLevel(Math.round(bat.level * 100));
      setIsCharging(bat.charging);
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((bat) => {
        battery = bat;
        updateBatteryInfo(battery);
        battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
        battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
      });
    } else {
      setBatteryLevel('Battery API not supported');
      setIsCharging(null);
    }

    // Cleanup listeners on unmount
    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', () => updateBatteryInfo(battery));
        battery.removeEventListener('chargingchange', () => updateBatteryInfo(battery));
      }
    };
  }, []);

  useEffect(() => {
    // Fetch public IP address
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip))
      .catch(() => setIpAddress('Unable to retrieve IP'));
  }, []);

  return (
    <>

    {batteryLevel !== null && batteryLevel < 61 && isCharging === false && (
        <div className='fixed z-111 top-0 w-full h-screen text-2xl text-red-700 font-semibold text-center danger-edges'>
          <br></br>
          &nbsp;⚡ Low battery!! 🔋 Charge your device &nbsp;
        </div>
        
    )}


    <div className='fixed flex flex-col bottom-2 left-2 z-111 text-[0.70rem]'>
        <span>Battery:
        <span id="battery-percentage">{batteryLevel}%</span>
        </span>
        
        <span
          id="battery-charging"
          className={isCharging === false ? '' : 'text-green-300'}
        >
          Charging: {isCharging === null ? '--' : isCharging ? 'Yes' : 'No'}
        </span>

        <span className="info-label">Public IP Address:
        <span id="ip-address">{ipAddress}</span>
        </span>
    </div>
    </>
  );
};

export default SystemInfo;
