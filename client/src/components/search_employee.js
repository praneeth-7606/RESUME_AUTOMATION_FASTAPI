// import React from 'react';

// const SearchEmployee = ({ 
//   firstName, 
//   setFirstName, 
//   lastName, 
//   setLastName, 
//   searchResults, 
//   setSearchResults, 
//   showSearchResults, 
//   setShowSearchResults 
// }) => {
//   // Handler for employee search
//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!firstName || !lastName) {
//       alert('Please enter both first and last name');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8000/search/by-name', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           first_name: firstName,
//           last_name: lastName
//         })
//       });

//       const data = await response.json();
//       setSearchResults(data);
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to search');
//     }
//   };

//   return (
//     <div className="card">
//       <h2>4. Search Employee in Skill Matrix</h2>
//       <form id="search-form" onSubmit={handleSearch}>
//         <label htmlFor="first-name">First Name:</label>
//         <input 
//           type="text" 
//           id="first-name" 
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required 
//         />
//         <label htmlFor="last-name">Last Name:</label>
//         <input 
//           type="text" 
//           id="last-name" 
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required 
//         />
//         <button type="submit">Search</button>
//       </form>
//       {showSearchResults && (
//         <div id="search-results">
//           {searchResults.length > 0 ? (
//             <div>
//               <h3>Search Results:</h3>
//               <ul>
//                 {searchResults.map((item, index) => {
//                   const id = item.ID || item.Id || "N/A";
//                   const fName = item.First_Name || item["First Name"] || "N/A";
//                   const lName = item.Last_Name || item["Last Name"] || "N/A";
//                   const experience = item.Experience || "N/A";
//                   const sheetName = item["Sheet Name"] || "Unknown";
                  
//                   return (
//                     <li key={index}>
//                       ID: {id}, Name: {fName} {lName}, 
//                       Experience: {experience}, 
//                       Sheet: {sheetName}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ) : (
//             <p>No results found. Please check the name and try again.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchEmployee;




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const EmployeeList = ({ selectedEmployee, setSelectedEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Theme colors
  const colors = {
    primary: '#4361ee',
    secondary: '#3f37c9',
    success: '#4cc9f0',
    accent: '#f72585',
    light: '#f8f9fa',
    dark: '#212529',
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      margin: '0',
      color: colors.dark,
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f3f9',
      borderRadius: '8px',
      padding: '8px 15px',
      marginBottom: '20px',
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      fontSize: '1rem',
      width: '100%',
      outline: 'none',
      marginLeft: '10px',
    },
    employeeList: {
      maxHeight: '300px',
      overflowY: 'auto',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
    },
    employeeItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #e9ecef',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    employeeItemSelected: {
      backgroundColor: '#e6f7ff',
      borderLeft: `4px solid ${colors.primary}`,
    },
    employeeAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#e9ecef',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '15px',
      fontSize: '18px',
      color: colors.secondary,
    },
    employeeInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    employeeName: {
      fontWeight: '500',
      margin: '0 0 3px 0',
    },
    employeeDepartment: {
      fontSize: '0.85rem',
      color: '#6c757d',
      margin: '0',
    },
    noResults: {
      padding: '20px',
      textAlign: 'center',
      color: '#6c757d',
    },
    loadingState: {
      padding: '20px',
      textAlign: 'center',
      color: '#6c757d',
    },
    errorState: {
      padding: '20px',
      textAlign: 'center',
      color: colors.accent,
    },
    selectedEmployeeSection: {
      marginTop: '20px',
      borderTop: '1px solid #e9ecef',
      paddingTop: '20px',
    },
    selectedEmployeeTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: colors.dark,
    },
    selectedEmployeeBox: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
    }
  };

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/search/employees/list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch employees. Please upload a skill matrix first.');
        }
        
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee => 
        `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // Handle employee selection
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get employee initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={styles.container}
    >
      <div style={styles.header}>
        <h2 style={styles.title}>
          <span style={{ marginRight: '15px', fontSize: '28px' }}>2</span>
          Select Employee
        </h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TeamOutlined style={{ fontSize: '24px', color: colors.primary }} />
          <span style={{ marginLeft: '8px', color: '#6c757d' }}>
            {employees.length} employees
          </span>
        </div>
      </div>

      <div style={styles.searchContainer}>
        <SearchOutlined style={{ color: '#6c757d' }} />
        <input
          type="text"
          placeholder="Search employees..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div style={styles.loadingState}>Loading employees...</div>
      ) : error ? (
        <div style={styles.errorState}>{error}</div>
      ) : (
        <>
          <div style={styles.employeeList}>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div
                  key={employee.ID}
                  style={{
                    ...styles.employeeItem,
                    ...(selectedEmployee?.ID === employee.ID ? styles.employeeItemSelected : {}),
                  }}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <div style={styles.employeeAvatar}>
                    {getInitials(employee.first_name, employee.last_name)}
                  </div>
                  <div style={styles.employeeInfo}>
                    <p style={styles.employeeName}>
                      {employee.first_name} {employee.last_name}
                    </p>
                    <p style={styles.employeeDepartment}>
                      {employee.sheet_name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.noResults}>No employees found</div>
            )}
          </div>

          {selectedEmployee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.selectedEmployeeSection}
            >
              <h3 style={styles.selectedEmployeeTitle}>Selected Employee</h3>
              <div style={styles.selectedEmployeeBox}>
                <p style={{ margin: 0, fontWeight: '500' }}>
                  {selectedEmployee.first_name} {selectedEmployee.last_name}
                </p>
                <p style={{ margin: '5px 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
                  ID: {selectedEmployee.ID} | Department: {selectedEmployee.sheet_name}
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default EmployeeList;



// import React, { useEffect } from 'react';

// const SearchEmployee = ({
//   firstName,
//   setFirstName,
//   lastName,
//   setLastName,
//   searchResults,
//   setSearchResults,
//   showSearchResults,
//   setShowSearchResults,
//   autoSelectedEmployee
// }) => {
//   // Handler for employee search
//   const handleSearch = async (e) => {
//     if (e) e.preventDefault();
    
//     if (!firstName || !lastName) {
//       alert('Please enter both first and last name');
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:8000/search/by-name', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           first_name: firstName,
//           last_name: lastName
//         })
//       });
      
//       const data = await response.json();
//       setSearchResults(data);
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to search');
//     }
//   };

//   // Effect to handle automatic search when an employee is selected from UploadSkillMatrix
//   useEffect(() => {
//     if (autoSelectedEmployee && autoSelectedEmployee.first_name && autoSelectedEmployee.last_name) {
//       setFirstName(autoSelectedEmployee.first_name);
//       setLastName(autoSelectedEmployee.last_name);
      
//       // Trigger the search automatically
//       const performSearch = async () => {
//         try {
//           const response = await fetch('http://localhost:8000/search/by-name', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               first_name: autoSelectedEmployee.first_name,
//               last_name: autoSelectedEmployee.last_name
//             })
//           });
          
//           const data = await response.json();
//           setSearchResults(data);
//           setShowSearchResults(true);
//         } catch (error) {
//           console.error('Error in auto search:', error);
//         }
//       };
      
//       performSearch();
//     }
//   }, [autoSelectedEmployee, setFirstName, setLastName, setSearchResults, setShowSearchResults]);

//   return (
//     <div className="card shadow-sm border-0 mb-4">
//       <div className="card-header bg-primary text-white py-3">
//         <h3 className="mb-0">
//           <span className="me-2">4.</span>
//           Search Employee in Skill Matrix
//         </h3>
//       </div>
//       <div className="card-body p-4">
//         <form onSubmit={handleSearch} className="row g-3">
//           <div className="col-md-5">
//             <label htmlFor="firstName" className="form-label">First Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="firstName"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-5">
//             <label htmlFor="lastName" className="form-label">Last Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="lastName"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-2 d-flex align-items-end">
//             <button type="submit" className="btn btn-primary w-100">Search</button>
//           </div>
//         </form>
        
//         {showSearchResults && (
//           <div className="mt-4">
//             {searchResults.length > 0 ? (
//               <div className="search-results">
//                 <h4 className="mb-3">Search Results:</h4>
//                 <ul className="list-group">
//                   {searchResults.map((item, index) => {
//                     const id = item.ID || item.Id || "N/A";
//                     const fName = item.First_Name || item["First Name"] || "N/A";
//                     const lName = item.Last_Name || item["Last Name"] || "N/A";
//                     const experience = item.Experience || "N/A";
//                     const sheetName = item["Sheet Name"] || "Unknown";
                    
//                     return (
//                       <li key={index} className="list-group-item">
//                         <strong>ID:</strong> {id}, <strong>Name:</strong> {fName} {lName},
//                         <strong>Experience:</strong> {experience},
//                         <strong>Sheet:</strong> {sheetName}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             ) : (
//               <div className="alert alert-warning">
//                 No results found. Please check the name and try again.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchEmployee;