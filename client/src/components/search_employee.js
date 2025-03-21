




// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { SearchOutlined, UserOutlined, TeamOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// const EmployeeList = ({ selectedEmployee, setSelectedEmployee }) => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [hoveredEmployee, setHoveredEmployee] = useState(null);

//   // Enhanced theme colors
//   const colors = {
//     primary: '#3a86ff',
//     secondary: '#4361ee',
//     tertiary: '#4cc9f0',
//     success: '#06d6a0',
//     accent: '#ff006e',
//     warning: '#ffbe0b',
//     light: '#f8f9fa',
//     dark: '#212529',
//     darkBlue: '#0d1b2a',
//     glass: 'rgba(255, 255, 255, 0.2)',
//   };

//   // Enhanced Styles
//   const styles = {
//     container: {
//       padding: '30px',
//       backgroundColor: '#ffffff',
//       borderRadius: '16px',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04)',
//       marginBottom: '25px',
//       background: `radial-gradient(circle at top right, rgba(76, 201, 240, 0.03), transparent 400px)`,
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '25px',
//       position: 'relative',
//     },
//     title: {
//       fontSize: '1.75rem',
//       fontWeight: '700',
//       margin: '0',
//       color: colors.darkBlue,
//       display: 'flex',
//       alignItems: 'center',
//       letterSpacing: '-0.5px',
//     },
//     stepIndicator: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       marginRight: '18px',
//       fontSize: '20px',
//       fontWeight: '700',
//       color: '#fff',
//       boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     },
//     employeeCount: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '10px 16px',
//       background: `linear-gradient(to right, rgba(67, 97, 238, 0.08), rgba(67, 97, 238, 0.14))`,
//       borderRadius: '12px',
//       color: colors.secondary,
//       fontWeight: '600',
//       fontSize: '15px',
//     },
//     searchContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: 'rgba(241, 243, 249, 0.8)',
//       borderRadius: '12px',
//       padding: '12px 20px',
//       marginBottom: '25px',
//       boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03)',
//       transition: 'all 0.3s ease',
//       border: '1px solid rgba(0, 0, 0, 0.03)',
//     },
//     searchContainerFocused: {
//       boxShadow: `inset 0 2px 5px rgba(0, 0, 0, 0.03), 0 0 0 2px rgba(67, 97, 238, 0.15)`,
//     },
//     searchInput: {
//       border: 'none',
//       background: 'transparent',
//       fontSize: '1rem',
//       width: '100%',
//       outline: 'none',
//       marginLeft: '12px',
//       color: colors.darkBlue,
//       fontWeight: '500',
//     },
//     searchIcon: {
//       fontSize: '18px',
//       color: colors.secondary,
//     },
//     employeeList: {
//       maxHeight: '350px',
//       overflowY: 'auto',
//       borderRadius: '12px',
//       border: '1px solid rgba(233, 236, 239, 0.8)',
//       boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.02)',
//       '&::-webkit-scrollbar': {
//         width: '8px',
//       },
//       '&::-webkit-scrollbar-track': {
//         background: '#f1f1f1',
//         borderRadius: '10px',
//       },
//       '&::-webkit-scrollbar-thumb': {
//         background: '#c1c1c1',
//         borderRadius: '10px',
//       },
//     },
//     employeeItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '16px 20px',
//       borderBottom: '1px solid rgba(233, 236, 239, 0.8)',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     employeeItemHovered: {
//       backgroundColor: 'rgba(230, 247, 255, 0.5)',
//     },
//     employeeItemSelected: {
//       backgroundColor: 'rgba(67, 97, 238, 0.08)',
//       borderLeft: `4px solid ${colors.primary}`,
//     },
//     employeeAvatar: {
//       width: '45px',
//       height: '45px',
//       borderRadius: '50%',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: '16px',
//       fontSize: '16px',
//       fontWeight: '600',
//       color: '#fff',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     avatarBackground: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
//     },
//     employeeInfo: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     employeeName: {
//       fontWeight: '600',
//       margin: '0 0 4px 0',
//       fontSize: '16px',
//       color: colors.darkBlue,
//     },
//     employeeDepartment: {
//       fontSize: '0.85rem',
//       color: '#6c757d',
//       margin: '0',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     departmentIcon: {
//       fontSize: '14px',
//       marginRight: '5px',
//       color: '#adb5bd',
//     },
//     noResults: {
//       padding: '30px',
//       textAlign: 'center',
//       color: '#6c757d',
//       fontWeight: '500',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '150px',
//     },
//     noResultsIcon: {
//       fontSize: '48px',
//       color: '#ced4da',
//       marginBottom: '15px',
//     },
//     loadingState: {
//       padding: '30px',
//       textAlign: 'center',
//       color: '#6c757d',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '150px',
//     },
//     loadingIcon: {
//       fontSize: '36px',
//       color: colors.primary,
//       marginBottom: '15px',
//     },
//     errorState: {
//       padding: '30px',
//       textAlign: 'center',
//       color: colors.accent,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '150px',
//       backgroundColor: 'rgba(255, 0, 110, 0.05)',
//       borderRadius: '12px',
//     },
//     errorIcon: {
//       fontSize: '36px',
//       color: colors.accent,
//       marginBottom: '15px',
//     },
//     selectedEmployeeSection: {
//       marginTop: '30px',
//       borderTop: '1px solid rgba(233, 236, 239, 0.8)',
//       paddingTop: '25px',
//     },
//     selectedEmployeeTitle: {
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       marginBottom: '15px',
//       color: colors.darkBlue,
//       display: 'flex',
//       alignItems: 'center',
//     },
//     selectedEmployeeBox: {
//       backgroundColor: 'rgba(248, 249, 250, 0.7)',
//       padding: '20px',
//       borderRadius: '12px',
//       border: '1px solid rgba(233, 236, 239, 0.9)',
//       display: 'flex',
//       alignItems: 'center',
//       boxShadow: '0 3px 10px rgba(0, 0, 0, 0.03)',
//     },
//     selectedAvatar: {
//       width: '55px',
//       height: '55px',
//       borderRadius: '50%',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: '20px',
//       fontSize: '20px',
//       fontWeight: '600',
//       color: '#fff',
//       position: 'relative',
//       overflow: 'hidden',
//       boxShadow: '0 4px 10px rgba(67, 97, 238, 0.2)',
//     },
//     selectedInfo: {
//       flex: 1,
//     },
//     selectedName: {
//       margin: 0,
//       fontWeight: '600',
//       fontSize: '18px',
//       color: colors.darkBlue,
//     },
//     selectedDetails: {
//       margin: '8px 0 0',
//       color: '#6c757d',
//       fontSize: '0.95rem',
//       display: 'flex',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//     },
//     detailItem: {
//       display: 'flex',
//       alignItems: 'center',
//       marginRight: '15px',
//     },
//     detailIcon: {
//       fontSize: '14px',
//       marginRight: '5px',
//       color: '#adb5bd',
//     },
//     highlightBadge: {
//       padding: '3px 8px',
//       borderRadius: '4px',
//       fontSize: '0.8rem',
//       fontWeight: '600',
//       backgroundColor: `rgba(67, 97, 238, 0.1)`,
//       color: colors.secondary,
//       marginLeft: '5px',
//     },
//     shimmer: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
//       animation: 'shimmer 1.5s infinite',
//     },
//   };

//   // Fetch employees when component mounts
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('http://localhost:8000/search/employees/list');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch employees. Please upload a skill matrix first.');
//         }
        
//         const data = await response.json();
//         setEmployees(data);
//         setFilteredEmployees(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Filter employees based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredEmployees(employees);
//     } else {
//       const filtered = employees.filter(employee => 
//         `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (employee.sheet_name && employee.sheet_name.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredEmployees(filtered);
//     }
//   }, [searchTerm, employees]);

//   // Handle employee selection
//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Get employee initials for avatar
//   const getInitials = (firstName, lastName) => {
//     return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
//   };

//   // Generate a pastel color based on employee name
//   const getAvatarGradient = (firstName, lastName) => {
//     const initials = getInitials(firstName, lastName);
//     const nameSum = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    
//     // Define a set of good-looking gradient pairs
//     const gradients = [
//       ['#3a86ff', '#4361ee'], // Blue
//       ['#4cc9f0', '#3a86ff'], // Light blue
//       ['#06d6a0', '#4cc9f0'], // Teal
//       ['#ffbe0b', '#ff9e00'], // Orange
//       ['#ff006e', '#ff5e8a'], // Pink
//       ['#8338ec', '#6a67ce'], // Purple
//     ];
    
//     const gradientIndex = nameSum % gradients.length;
//     return `linear-gradient(135deg, ${gradients[gradientIndex][0]}, ${gradients[gradientIndex][1]})`;
//   };

//   // Render shimmer effect
//   const ShimmerEffect = () => (
//     <motion.div
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: '-100%',
//         right: 0,
//         bottom: 0,
//         background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
//         opacity: 0.7,
//       }}
//       animate={{ left: ['-100%', '100%'] }}
//       transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//     />
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       style={styles.container}
//       whileHover={{ boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 1px 12px rgba(0, 0, 0, 0.06)' }}
//     >
//       <div style={styles.header}>
//         <h2 style={styles.title}>
//           <div style={styles.stepIndicator}>2</div>
//           Select Employee
//         </h2>
//         <div style={styles.employeeCount}>
//           <TeamOutlined style={{ fontSize: '18px', marginRight: '10px' }} />
//           <span>{employees.length} employees</span>
//         </div>
//       </div>

//       <motion.div 
//         style={styles.searchContainer}
//         whileHover={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03), 0 0 0 2px rgba(67, 97, 238, 0.08)' }}
//         whileFocus={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03), 0 0 0 2px rgba(67, 97, 238, 0.15)' }}
//       >
//         <SearchOutlined style={styles.searchIcon} />
//         <input
//           type="text"
//           placeholder="Search employees by name or department..."
//           style={styles.searchInput}
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </motion.div>

//       <AnimatePresence mode="wait">
//         {loading ? (
//           <motion.div 
//             key="loading"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={styles.loadingState}
//           >
//             <LoadingOutlined style={styles.loadingIcon} spin />
//             <p style={{ margin: '0', fontWeight: '500' }}>Loading employees...</p>
//           </motion.div>
//         ) : error ? (
//           <motion.div 
//             key="error"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={styles.errorState}
//           >
//             <ExclamationCircleOutlined style={styles.errorIcon} />
//             <p style={{ margin: '0', fontWeight: '500' }}>{error}</p>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="content"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <div style={styles.employeeList}>
//               {filteredEmployees.length > 0 ? (
//                 filteredEmployees.map((employee) => (
//                   <motion.div
//                     key={employee.ID}
//                     style={{
//                       ...styles.employeeItem,
//                       ...(hoveredEmployee === employee.ID ? styles.employeeItemHovered : {}),
//                       ...(selectedEmployee?.ID === employee.ID ? styles.employeeItemSelected : {}),
//                     }}
//                     onClick={() => handleEmployeeSelect(employee)}
//                     onMouseEnter={() => setHoveredEmployee(employee.ID)}
//                     onMouseLeave={() => setHoveredEmployee(null)}
//                     whileHover={{ backgroundColor: 'rgba(230, 247, 255, 0.5)' }}
//                     whileTap={{ scale: 0.99 }}
//                   >
//                     <div style={styles.employeeAvatar}>
//                       <div style={{ 
//                         ...styles.avatarBackground, 
//                         background: getAvatarGradient(employee.first_name, employee.last_name)
//                       }} />
//                       <div style={{ position: 'relative', zIndex: 1 }}>
//                         {getInitials(employee.first_name, employee.last_name)}
//                       </div>
//                     </div>
//                     <div style={styles.employeeInfo}>
//                       <p style={styles.employeeName}>
//                         {employee.first_name} {employee.last_name}
//                       </p>
//                       <p style={styles.employeeDepartment}>
//                         <TeamOutlined style={styles.departmentIcon} />
//                         {employee.sheet_name}
//                       </p>
//                     </div>
//                     {hoveredEmployee === employee.ID && <ShimmerEffect />}
//                   </motion.div>
//                 ))
//               ) : (
//                 <motion.div 
//                   style={styles.noResults}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <UserOutlined style={styles.noResultsIcon} />
//                   <p style={{ margin: '0', fontWeight: '500' }}>No employees found</p>
//                   {searchTerm && (
//                     <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
//                       Try adjusting your search query
//                     </p>
//                   )}
//                 </motion.div>
//               )}
//             </div>

//             {selectedEmployee && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1, duration: 0.4 }}
//                 style={styles.selectedEmployeeSection}
//               >
//                 <h3 style={styles.selectedEmployeeTitle}>
//                   <UserOutlined style={{ marginRight: '10px', color: colors.secondary }} />
//                   Selected Employee
//                 </h3>
//                 <motion.div 
//                   style={styles.selectedEmployeeBox}
//                   whileHover={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}
//                 >
//                   <div style={styles.selectedAvatar}>
//                     <div style={{ 
//                       ...styles.avatarBackground, 
//                       background: getAvatarGradient(selectedEmployee.first_name, selectedEmployee.last_name)
//                     }} />
//                     <div style={{ position: 'relative', zIndex: 1 }}>
//                       {getInitials(selectedEmployee.first_name, selectedEmployee.last_name)}
//                     </div>
//                   </div>
//                   <div style={styles.selectedInfo}>
//                     <motion.p 
//                       style={styles.selectedName}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       {selectedEmployee.first_name} {selectedEmployee.last_name}
//                     </motion.p>
//                     <motion.div 
//                       style={styles.selectedDetails}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       <div style={styles.detailItem}>
//                         <UserOutlined style={styles.detailIcon} />
//                         <span>ID: {selectedEmployee.ID}</span>
//                       </div>
//                       <div style={styles.detailItem}>
//                         <TeamOutlined style={styles.detailIcon} />
//                         <span>Department:</span>
//                         <span style={styles.highlightBadge}>{selectedEmployee.sheet_name}</span>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default EmployeeList;





import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchOutlined, UserOutlined, TeamOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const EmployeeList = ({ selectedEmployee, setSelectedEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [hoveredEmployee, setHoveredEmployee] = useState(null);

  // Enhanced theme colors
  const colors = {
    primary: '#3a86ff',
    secondary: '#4361ee',
    tertiary: '#4cc9f0',
    success: '#06d6a0',
    accent: '#ff006e',
    warning: '#ffbe0b',
    light: '#f8f9fa',
    dark: '#212529',
    darkBlue: '#0d1b2a',
    glass: 'rgba(255, 255, 255, 0.2)',
  };

  // Enhanced Styles
  const styles = {
    container: {
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04)',
      marginBottom: '25px',
      background: `radial-gradient(circle at top right, rgba(76, 201, 240, 0.03), transparent 400px)`,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      position: 'relative',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      margin: '0',
      color: colors.darkBlue,
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '-0.5px',
    },
    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      marginRight: '18px',
      fontSize: '20px',
      fontWeight: '700',
      color: '#fff',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    employeeCount: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      background: `linear-gradient(to right, rgba(67, 97, 238, 0.08), rgba(67, 97, 238, 0.14))`,
      borderRadius: '12px',
      color: colors.secondary,
      fontWeight: '600',
      fontSize: '15px',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(241, 243, 249, 0.8)',
      borderRadius: '12px',
      padding: '12px 20px',
      marginBottom: '25px',
      boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.03)',
    },
    searchContainerFocused: {
      boxShadow: `inset 0 2px 5px rgba(0, 0, 0, 0.03), 0 0 0 2px rgba(67, 97, 238, 0.15)`,
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      fontSize: '1rem',
      width: '100%',
      outline: 'none',
      marginLeft: '12px',
      color: colors.darkBlue,
      fontWeight: '500',
    },
    searchIcon: {
      fontSize: '18px',
      color: colors.secondary,
    },
    employeeList: {
      maxHeight: '350px',
      overflowY: 'auto',
      borderRadius: '12px',
      border: '1px solid rgba(233, 236, 239, 0.8)',
      boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.02)',
    },
    employeeItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: '1px solid rgba(233, 236, 239, 0.8)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    employeeItemHovered: {
      backgroundColor: 'rgba(230, 247, 255, 0.5)',
    },
    employeeItemSelected: {
      backgroundColor: 'rgba(67, 97, 238, 0.12)',
      borderLeft: `4px solid ${colors.primary}`,
      position: 'relative',
      paddingLeft: '16px',
    },
    selectedIndicator: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: colors.success,
      color: 'white',
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    employeeAvatar: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    },
    avatarBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    },
    employeeInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    employeeName: {
      fontWeight: '600',
      margin: '0 0 4px 0',
      fontSize: '16px',
      color: colors.darkBlue,
    },
    employeeDepartment: {
      fontSize: '0.85rem',
      color: '#6c757d',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
    },
    departmentIcon: {
      fontSize: '14px',
      marginRight: '5px',
      color: '#adb5bd',
    },
    noResults: {
      padding: '30px',
      textAlign: 'center',
      color: '#6c757d',
      fontWeight: '500',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px',
    },
    noResultsIcon: {
      fontSize: '48px',
      color: '#ced4da',
      marginBottom: '15px',
    },
    loadingState: {
      padding: '30px',
      textAlign: 'center',
      color: '#6c757d',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px',
    },
    loadingIcon: {
      fontSize: '36px',
      color: colors.primary,
      marginBottom: '15px',
    },
    errorState: {
      padding: '30px',
      textAlign: 'center',
      color: colors.accent,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px',
      backgroundColor: 'rgba(255, 0, 110, 0.05)',
      borderRadius: '12px',
    },
    errorIcon: {
      fontSize: '36px',
      color: colors.accent,
      marginBottom: '15px',
    },
    selectedEmployeeSection: {
      marginTop: '30px',
      borderTop: '1px solid rgba(233, 236, 239, 0.8)',
      paddingTop: '25px',
    },
    selectedEmployeeTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '15px',
      color: colors.darkBlue,
      display: 'flex',
      alignItems: 'center',
    },
    selectedEmployeeBox: {
      backgroundColor: 'rgba(248, 249, 250, 0.7)',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(233, 236, 239, 0.9)',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.03)',
    },
    selectedAvatar: {
      width: '55px',
      height: '55px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '20px',
      fontSize: '20px',
      fontWeight: '600',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(67, 97, 238, 0.2)',
    },
    selectedInfo: {
      flex: 1,
    },
    selectedName: {
      margin: 0,
      fontWeight: '600',
      fontSize: '18px',
      color: colors.darkBlue,
    },
    selectedDetails: {
      margin: '8px 0 0',
      color: '#6c757d',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '15px',
    },
    detailIcon: {
      fontSize: '14px',
      marginRight: '5px',
      color: '#adb5bd',
    },
    highlightBadge: {
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: '600',
      backgroundColor: `rgba(67, 97, 238, 0.1)`,
      color: colors.secondary,
      marginLeft: '5px',
    },
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
        `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.sheet_name && employee.sheet_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // Handle employee selection
  const handleEmployeeSelect = (employee) => {
    // If already selected, do nothing
    if (selectedEmployee?.ID === employee.ID) return;
    
    // Create a highlight animation effect before setting the selected employee
    setHoveredEmployee(null); // Clear any hover state
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

  // Generate a pastel color based on employee name
  const getAvatarGradient = (firstName, lastName) => {
    const initials = getInitials(firstName, lastName);
    const nameSum = (initials.charCodeAt(0) || 65) + (initials.charCodeAt(1) || 65);
    
    // Define a set of good-looking gradient pairs
    const gradients = [
      ['#3a86ff', '#4361ee'], // Blue
      ['#4cc9f0', '#3a86ff'], // Light blue
      ['#06d6a0', '#4cc9f0'], // Teal
      ['#ffbe0b', '#ff9e00'], // Orange
      ['#ff006e', '#ff5e8a'], // Pink
      ['#8338ec', '#6a67ce'], // Purple
    ];
    
    const gradientIndex = nameSum % gradients.length;
    return `linear-gradient(135deg, ${gradients[gradientIndex][0]}, ${gradients[gradientIndex][1]})`;
  };
  
  // Function to ensure only one employee is highlighted at a time
  const handleMouseEnter = (employeeId) => {
    setHoveredEmployee(employeeId);
  };
  
  const handleMouseLeave = () => {
    setHoveredEmployee(null);
  };

  // Render shimmer effect
  const ShimmerEffect = () => (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        opacity: 0.7,
      }}
      animate={{ left: ['-100%', '100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={styles.container}
      whileHover={{ boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 1px 12px rgba(0, 0, 0, 0.06)' }}
    >
      <div style={styles.header}>
        <h2 style={styles.title}>
        <div style={styles.stepIndicator}><UserOutlined style={{ fontSize: '22px' }} /></div>
          Select Employee
        </h2>
        <div style={styles.employeeCount}>
          <TeamOutlined style={{ fontSize: '18px', marginRight: '10px' }} />
          <span>{employees.length} employees</span>
        </div>
      </div>

      <motion.div 
        style={styles.searchContainer}
        whileHover={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03), 0 0 0 2px rgba(67, 97, 238, 0.08)' }}
      >
        <SearchOutlined style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search employees by name or department..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.loadingState}
          >
            <LoadingOutlined style={styles.loadingIcon} spin />
            <p style={{ margin: '0', fontWeight: '500' }}>Loading employees...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.errorState}
          >
            <ExclamationCircleOutlined style={styles.errorIcon} />
            <p style={{ margin: '0', fontWeight: '500' }}>{error}</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.employeeList}>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <motion.div
                    key={employee.ID}
                    style={{
                      ...styles.employeeItem,
                      ...(hoveredEmployee === employee.ID ? styles.employeeItemHovered : {}),
                      ...(selectedEmployee?.ID === employee.ID ? styles.employeeItemSelected : {}),
                    }}
                    onClick={() => handleEmployeeSelect(employee)}
                    onMouseEnter={() => handleMouseEnter(employee.ID)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ backgroundColor: 'rgba(230, 247, 255, 0.5)' }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {selectedEmployee?.ID === employee.ID && (
                      <div style={styles.selectedIndicator}>Selected</div>
                    )}
                    <div style={styles.employeeAvatar}>
                      <div style={{ 
                        ...styles.avatarBackground, 
                        background: getAvatarGradient(employee.first_name, employee.last_name)
                      }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        {getInitials(employee.first_name, employee.last_name)}
                      </div>
                    </div>
                    <div style={styles.employeeInfo}>
                      <p style={styles.employeeName}>
                        {employee.first_name} {employee.last_name}
                      </p>
                      <p style={styles.employeeDepartment}>
                        <TeamOutlined style={styles.departmentIcon} />
                        {employee.sheet_name}
                      </p>
                    </div>
                    {hoveredEmployee === employee.ID && <ShimmerEffect />}
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  style={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <UserOutlined style={styles.noResultsIcon} />
                  <p style={{ margin: '0', fontWeight: '500' }}>No employees found</p>
                  {searchTerm && (
                    <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
                      Try adjusting your search query
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {selectedEmployee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={styles.selectedEmployeeSection}
                key={`selected-${selectedEmployee.ID}`}
              >
                <h3 style={styles.selectedEmployeeTitle}>
                  <UserOutlined style={{ marginRight: '10px', color: colors.secondary }} />
                  Selected Employee
                </h3>
                <motion.div 
                  style={styles.selectedEmployeeBox}
                  whileHover={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}
                >
                  <div style={styles.selectedAvatar}>
                    <div style={{ 
                      ...styles.avatarBackground, 
                      background: getAvatarGradient(selectedEmployee.first_name, selectedEmployee.last_name)
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {getInitials(selectedEmployee.first_name, selectedEmployee.last_name)}
                    </div>
                  </div>
                  <div style={styles.selectedInfo}>
                    <motion.p 
                      style={styles.selectedName}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedEmployee.first_name} {selectedEmployee.last_name}
                    </motion.p>
                    <motion.div 
                      style={styles.selectedDetails}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div style={styles.detailItem}>
                        <UserOutlined style={styles.detailIcon} />
                        <span>ID: {selectedEmployee.ID}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <TeamOutlined style={styles.detailIcon} />
                        <span>Department:</span>
                        <span style={styles.highlightBadge}>{selectedEmployee.sheet_name}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmployeeList;