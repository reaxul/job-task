import React, { useState } from 'react';

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('all');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, status };
    setTasks([...tasks, newTask]);
    setName('');
    setStatus('all');
  };

  const filterAndSortTasks = () => {
    let filteredTasks = [...tasks];

    if (status === 'active') {
      filteredTasks = filteredTasks.filter((task) => task.status === 'active');
    } else if (status === 'completed') {
      filteredTasks = filteredTasks.filter((task) => task.status === 'completed');
    }

    filteredTasks.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') {
        return -1;
      } else if (a.status === 'completed' && b.status !== 'active') {
        return -1;
      }
      return 0;
    });

    return filteredTasks;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleFormSubmit}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${status === 'all' && 'active'}`}
                type="button"
                onClick={() => setStatus('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${status === 'active' && 'active'}`}
                type="button"
                onClick={() => setStatus('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${status === 'completed' && 'active'}`}
                type="button"
                onClick={() => setStatus('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterAndSortTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
