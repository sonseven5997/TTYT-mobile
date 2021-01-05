const ultis = {};

ultis.fetchData = async (endpoint) => {
  const api = await fetch(
    `https://floating-eyrie-61483.herokuapp.com/api/${endpoint}`,
    {
      method:'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const data = await api.json();
  console.log(data);
  return data;
};

ultis.postData = async (endpoint, data) => {
  const api = await fetch(`https://floating-eyrie-61483.herokuapp.com/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });
  const dataToCheck = await api.json();
  console.log(dataToCheck);
  return dataToCheck;
};

ultis.deleteData = async (id, endpoint) => {
  await fetch(
    `https://floating-eyrie-61483.herokuapp.com/api/${endpoint}/${id}`,
    {
      method: "delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

ultis.putData = async (id, endpoint, data) => {
  await fetch(
    `https://floating-eyrie-61483.herokuapp.com/api/${endpoint}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        origin: `https://floating-eyrie-61483.herokuapp.com/api/${endpoint}/${id}`,
      },
      body: JSON.stringify(data),
    }
  );
};

ultis.convertDate = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export default ultis