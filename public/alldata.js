function AllData(){
  const [data, setData] = React.useState('');
  
  React.useEffect(() => {

    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });

  }, []);

  return (
    <div className="card mb-3">
      <div className="card-header">Each user's most recent transaction:</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </thead>
          <tbody>
            {data()}
          </tbody>
        </table>
        {loggedInUser && <p><b className="capitalize">{loggedInUser}</b> is logged in.</p>}
      </div>
    </div>
  )
}