export const fetchCars = async () => {
    const res = await fetch('https://myfakeapi.com/api/cars/');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    return data.cars;
  };
  