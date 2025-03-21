// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
// import confetti from 'canvas-confetti';

// const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);
//   const confettiCanvasRef = useRef(null);

//   // Theme colors
//   const colors = {
//     primary: '#4361ee',
//     secondary: '#3f37c9',
//     success: '#4cc9f0',
//     accent: '#f72585',
//     light: '#f8f9fa',
//     dark: '#212529',
//   };

//   // Trigger success animation
//   const triggerSuccessAnimation = () => {
//     if (confettiCanvasRef.current) {
//       const myConfetti = confetti.create(confettiCanvasRef.current, {
//         resize: true,
//         useWorker: true,
//       });
      
//       myConfetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: [colors.primary, colors.success, colors.accent],
//       });
//     }
//   };

//   // Handle drag events
//   useEffect(() => {
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('dragging');
//       }
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('idle');
//       }
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         const file = e.dataTransfer.files[0];
//         if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//           setSelectedFile(file);
//           setUploadState('idle');
//           setUploadError(null);
//         } else {
//           setUploadError('Please select a valid Excel file (.xlsx or .xls)');
//         }
//       }
//     };

//     const dropArea = uploadAreaRef.current;
//     if (dropArea) {
//       dropArea.addEventListener('dragover', handleDragOver);
//       dropArea.addEventListener('dragleave', handleDragLeave);
//       dropArea.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       if (dropArea) {
//         dropArea.removeEventListener('dragover', handleDragOver);
//         dropArea.removeEventListener('dragleave', handleDragLeave);
//         dropArea.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [uploadState]);

//   // Handler for file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadError(null);
//       setUploadState('idle');
//     }
//   };

//   // Simulate progress for better UX
//   const simulateProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 8) + 1;
//       if (progress > 95) {
//         clearInterval(interval);
//         progress = 95;
//       }
//       setUploadProgress(progress);
//     }, 200);
//     return interval;
//   };

//   // Handler for skill matrix upload
//   const handleSkillMatrixUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     setUploadState('uploading');
//     setUploadError(null);
//     setUploadProgress(0);
    
//     const progressInterval = simulateProgress();
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('http://localhost:8000/upload/skill-matrix', {
//         method: 'POST',
//         body: formData
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);
      
//       const data = await response.json();
//       if (response.ok) {
//         setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
//         }));
//         setUploadState('success');
//         setTimeout(triggerSuccessAnimation, 300);
//       } else {
//         setUploadError('Error: ' + data.detail);
//         setUploadState('error');
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       console.error('Error:', error);
//       setUploadError('Failed to upload file. Please try again.');
//       setUploadState('error');
//     }
//   };

//   // Reset upload
//   const resetUpload = () => {
//     setSelectedFile(null);
//     setUploadState('idle');
//     setUploadProgress(0);
//     setUploadError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Custom styles
//   const styles = {
//     container: {
//       position: 'relative',
//       maxWidth: '800px',
//       margin: '0 auto',
//       fontFamily: '"Poppins", sans-serif',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       border: 'none',
//       transition: 'all 0.3s ease',
//     },
//     cardHeader: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     headerBubble: {
//       position: 'absolute',
//       borderRadius: '50%',
//       background: 'rgba(255, 255, 255, 0.1)',
//     },
//     cardBody: {
//       padding: '30px',
//     },
//     uploadArea: {
//       border: `2px dashed ${colors.primary}`,
//       borderRadius: '12px',
//       padding: '40px 20px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       background: colors.light,
//       position: 'relative',
//       minHeight: '220px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     uploadAreaDragging: {
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//       borderColor: colors.success,
//       boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
//     },
//     uploadIcon: {
//       fontSize: '80px',
//       color: colors.primary,
//       margin: '0 auto 15px',
//       display: 'block',
//       transition: 'all 0.3s ease',
//     },
//     uploadPrompt: {
//       fontSize: '18px',
//       fontWeight: '500',
//       color: colors.dark,
//       marginBottom: '8px',
//     },
//     uploadHint: {
//       color: '#6c757d',
//       marginBottom: '0',
//     },
//     button: {
//       padding: '12px 24px',
//       fontSize: '16px',
//       fontWeight: '500',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     primaryButton: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       marginLeft: '10px',
//       boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
//       minWidth: '180px',
//     },
//     secondaryButton: {
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       color: colors.primary,
//     },
//     infoCard: {
//       marginTop: '20px',
//       borderRadius: '12px',
//       padding: '20px',
//       backgroundColor: 'rgba(76, 201, 240, 0.1)',
//       borderLeft: `5px solid ${colors.success}`,
//     },
//     fileInfo: {
//       display: 'flex',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       padding: '15px',
//       alignItems: 'center',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     },
//     fileIcon: {
//       fontSize: '40px',
//       color: '#217346', // Excel green
//       marginRight: '15px',
//     },
//     fileDetails: {
//       flex: 1,
//     },
//     fileName: {
//       fontWeight: '600',
//       fontSize: '16px',
//       marginBottom: '2px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: '250px',
//     },
//     fileSize: {
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     deleteButton: {
//       color: colors.accent,
//       fontSize: '18px',
//       cursor: 'pointer',
//     },
//     progressContainer: {
//       marginTop: '20px',
//     },
//     progressBarWrapper: {
//       height: '8px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '4px',
//       margin: '10px 0',
//       overflow: 'hidden',
//       position: 'relative',
//     },
//     progressBar: {
//       height: '100%',
//       borderRadius: '4px',
//       background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
//       transition: 'width 0.3s ease',
//     },
//     progressText: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       fontSize: '14px',
//       color: colors.dark,
//     },
//     successIcon: {
//       fontSize: '40px',
//       color: colors.success,
//       marginRight: '15px',
//     },
//     errorAlert: {
//       backgroundColor: 'rgba(247, 37, 133, 0.1)',
//       color: colors.accent,
//       borderRadius: '8px',
//       padding: '15px',
//       marginTop: '20px',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     confettiCanvas: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 10,
//     },
//     uploadComplete: {
//       padding: '20px',
//       textAlign: 'center',
//       maxWidth: '400px',
//       margin: '0 auto',
//     },
//   };

//   // Create bubble effects for header
//   const bubbles = [];
//   for (let i = 0; i < 8; i++) {
//     const size = Math.floor(Math.random() * 100) + 50;
//     const left = Math.floor(Math.random() * 100);
//     const top = Math.floor(Math.random() * 100) - 50;
//     const opacity = Math.random() * 0.1;
    
//     bubbles.push(
//       <div 
//         key={i}
//         style={{
//           ...styles.headerBubble,
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${left}%`,
//           top: `${top}%`,
//           opacity,
//         }}
//       />
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         style={styles.card}
//       >
//         <div style={styles.cardHeader}>
//           {bubbles}
//           <h2 style={styles.headerTitle}>
//             <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
//             Upload Your Skill Matrix
//           </h2>
//         </div>
        
//         <div style={styles.cardBody}>
//           <form onSubmit={handleSkillMatrixUpload}>
//             <AnimatePresence mode="wait">
//               {uploadState === 'success' ? (
//                 <motion.div 
//                   key="success-view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.4 }}
//                   style={styles.uploadComplete}
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: [0, 1.2, 1] }}
//                     transition={{ duration: 0.6, times: [0, 0.6, 1] }}
//                   >
//                     <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
//                   </motion.div>
                  
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     style={{ marginTop: '20px', color: colors.dark }}
//                   >
//                     Upload Complete!
//                   </motion.h3>
                  
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                     style={{ marginTop: '10px', color: '#6c757d' }}
//                   >
//                     Your skill matrix has been successfully uploaded and processed.
//                   </motion.p>
                  
//                   {fileInfo?.skillMatrix && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7, duration: 0.4 }}
//                       style={styles.infoCard}
//                     >
//                       <p style={{ margin: 0, fontWeight: '500' }}>
//                         {fileInfo.skillMatrix}
//                       </p>
//                     </motion.div>
//                   )}
                  
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.9, duration: 0.4 }}
//                     type="button"
//                     style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
//                     onClick={resetUpload}
//                   >
//                     Upload Another File
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="upload-view"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div 
//                     ref={uploadAreaRef}
//                     style={{
//                       ...styles.uploadArea,
//                       ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
//                     }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     {selectedFile ? (
//                       <div style={{ width: '100%' }}>
//                         <motion.div 
//                           initial={{ y: 10, opacity: 0 }}
//                           animate={{ y: 0, opacity: 1 }}
//                           style={styles.fileInfo}
//                         >
//                           <FileExcelOutlined style={styles.fileIcon} />
//                           <div style={styles.fileDetails}>
//                             <p style={styles.fileName} title={selectedFile.name}>
//                               {selectedFile.name}
//                             </p>
//                             <p style={styles.fileSize}>
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           {uploadState !== 'uploading' && (
//                             <DeleteOutlined 
//                               style={styles.deleteButton}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 resetUpload();
//                               }}
//                             />
//                           )}
//                         </motion.div>
                        
//                         {uploadState === 'uploading' && (
//                           <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={styles.progressContainer}
//                           >
//                             <div style={styles.progressText}>
//                               <span>Uploading...</span>
//                               <span>{uploadProgress}%</span>
//                             </div>
//                             <div style={styles.progressBarWrapper}>
//                               <motion.div 
//                                 style={styles.progressBar}
//                                 initial={{ width: '0%' }}
//                                 animate={{ width: `${uploadProgress}%` }}
//                               />
//                             </div>
//                             <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
//                               Please wait while we process your file
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     ) : (
//                       <motion.div
//                         animate={{ 
//                           y: [0, -10, 0],
//                           transition: { 
//                             repeat: Infinity, 
//                             duration: 2,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         <CloudUploadOutlined style={styles.uploadIcon} />
//                         <p style={styles.uploadPrompt}>
//                           {uploadState === 'dragging' 
//                             ? 'Drop your Excel file here' 
//                             : 'Drag & Drop your Excel file here'}
//                         </p>
//                         <p style={styles.uploadHint}>
//                           or click to browse from your device
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".xlsx,.xls"
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
                  
//                   {uploadError && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       style={styles.errorAlert}
//                     >
//                       <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                       {uploadError}
//                     </motion.div>
//                   )}
                  
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
//                   >
//                     <button
//                       type="button"
//                       style={{
//                         ...styles.button,
//                         ...styles.secondaryButton,
//                       }}
//                       onClick={() => fileInputRef.current.click()}
//                       disabled={uploadState === 'uploading'}
//                     >
//                       <UploadOutlined style={{ marginRight: '8px' }} />
//                       Browse Files
//                     </button>
                    
//                     <button
//                       type="submit"
//                       style={{
//                         ...styles.button,
//                         ...styles.primaryButton,
//                         opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
//                       }}
//                       disabled={!selectedFile || uploadState === 'uploading'}
//                     >
//                       {uploadState === 'uploading' ? (
//                         <>
//                           <LoadingOutlined style={{ marginRight: '8px' }} spin />
//                           Processing...
//                         </>
//                       ) : (
//                         'Upload Skill Matrix'
//                       )}
//                     </button>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadSkillMatrix;






import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const confettiCanvasRef = useRef(null);

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

  // Trigger enhanced success animation
  const triggerSuccessAnimation = () => {
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      });
      
      // First burst
      myConfetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6, x: 0.5 },
        colors: [colors.primary, colors.success, colors.accent, colors.warning],
        shapes: ['circle', 'square'],
        gravity: 1.2,
      });
      
      // Second delayed burst for effect
      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          spread: 120,
          origin: { y: 0.7, x: 0.5 },
          colors: [colors.primary, colors.success, colors.accent, colors.warning],
          shapes: ['circle', 'square'],
          gravity: 0.8,
          scalar: 1.2,
        });
      }, 500);
    }
  };

  // Handle drag events
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        setUploadState('dragging');
      }
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        setUploadState('idle');
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
          setSelectedFile(file);
          setUploadState('idle');
          setUploadError(null);
        } else {
          setUploadError('Please select a valid Excel file (.xlsx or .xls)');
        }
      }
    };

    const dropArea = uploadAreaRef.current;
    if (dropArea) {
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('drop', handleDrop);
    }

    return () => {
      if (dropArea) {
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('dragleave', handleDragLeave);
        dropArea.removeEventListener('drop', handleDrop);
      }
    };
  }, [uploadState]);

  // Handler for file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      setUploadState('idle');
    }
  };

  // Enhanced progress simulation for better UX
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      // More realistic progress simulation with variable speeds
      const increment = Math.floor(Math.random() * 10) + (progress < 30 ? 5 : progress < 70 ? 3 : 1);
      progress += increment;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95;
      }
      setUploadProgress(progress);
    }, 200);
    return interval;
  };

  // Handler for skill matrix upload
  const handleSkillMatrixUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadState('uploading');
    setUploadError(null);
    setUploadProgress(0);
    
    const progressInterval = simulateProgress();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/skill-matrix', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      if (response.ok) {
        setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
        setFileInfo(prev => ({
          ...prev,
          skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
        }));
        setUploadState('success');
        setTimeout(triggerSuccessAnimation, 300);
      } else {
        setUploadError('Error: ' + data.detail);
        setUploadState('error');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error:', error);
      setUploadError('Failed to upload file. Please try again.');
      setUploadState('error');
    }
  };

  // Reset upload
  const resetUpload = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Enhanced custom styles
  const styles = {
    container: {
      position: 'relative',
      maxWidth: '850px',
      margin: '0 auto',
      fontFamily: '"Inter", "Poppins", sans-serif',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 1px 12px rgba(0, 0, 0, 0.08)',
      border: 'none',
      transition: 'all 0.3s ease',
    },
    cardHeader: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 60%, ${colors.tertiary} 100%)`,
      color: 'white',
      padding: '28px 35px',
      position: 'relative',
      overflow: 'hidden',
    },
    headerTitle: {
      margin: 0,
      fontSize: '28px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      letterSpacing: '-0.5px',
    },
    headerBubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    cardBody: {
      padding: '40px',
      background: `radial-gradient(circle at top right, rgba(76, 201, 240, 0.03), transparent 400px)`,
    },
    uploadArea: {
      border: `2px dashed ${colors.primary}`,
      borderRadius: '16px',
      padding: '45px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      background: `linear-gradient(to bottom, ${colors.light}, rgba(248, 249, 250, 0.8))`,
      position: 'relative',
      minHeight: '240px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.02)',
    },
    uploadAreaDragging: {
      backgroundColor: 'rgba(67, 97, 238, 0.03)',
      borderColor: colors.success,
      transform: 'scale(1.02)',
      boxShadow: `0 0 30px rgba(67, 97, 238, 0.2), inset 0 2px 10px rgba(0, 0, 0, 0.02)`,
    },
    uploadIcon: {
      fontSize: '90px',
      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0 auto 20px',
      display: 'block',
      transition: 'all 0.3s ease',
      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
    },
    uploadPrompt: {
      fontSize: '22px',
      fontWeight: '600',
      background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.secondary} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '12px',
    },
    uploadHint: {
      color: '#6c757d',
      marginBottom: '5px',
      fontSize: '16px',
    },
    button: {
      padding: '14px 28px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: 'white',
      marginLeft: '15px',
      boxShadow: '0 8px 20px rgba(67, 97, 238, 0.3)',
      minWidth: '200px',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    },
    primaryButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 24px rgba(67, 97, 238, 0.4)',
    },
    secondaryButton: {
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      color: colors.primary,
      position: 'relative',
      overflow: 'hidden',
    },
    secondaryButtonHover: {
      backgroundColor: 'rgba(67, 97, 238, 0.15)',
      transform: 'translateY(-2px)',
    },
    buttonRipple: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.4)',
      transform: 'scale(0)',
      animation: 'ripple 0.8s linear',
      zIndex: -1,
    },
    infoCard: {
      marginTop: '25px',
      borderRadius: '14px',
      padding: '22px',
      backgroundColor: 'rgba(76, 201, 240, 0.08)',
      borderLeft: `5px solid ${colors.success}`,
      boxShadow: '0 4px 15px rgba(76, 201, 240, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    fileInfo: {
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '18px',
      alignItems: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.05)',
      backdropFilter: 'blur(10px)',
    },
    fileIcon: {
      fontSize: '48px',
      color: '#217346', // Excel green
      marginRight: '20px',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
    },
    fileDetails: {
      flex: 1,
    },
    fileName: {
      fontWeight: '600',
      fontSize: '18px',
      marginBottom: '4px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '300px',
      color: colors.darkBlue,
    },
    fileSize: {
      color: '#6c757d',
      fontSize: '14px',
    },
    deleteButton: {
      color: colors.accent,
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(255, 0, 110, 0.08)',
    },
    deleteButtonHover: {
      backgroundColor: 'rgba(255, 0, 110, 0.15)',
      transform: 'scale(1.1)',
    },
    progressContainer: {
      marginTop: '25px',
    },
    progressBarWrapper: {
      height: '10px',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      borderRadius: '5px',
      margin: '10px 0',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    },
    progressBar: {
      height: '100%',
      borderRadius: '5px',
      background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.tertiary} 50%, ${colors.success} 100%)`,
      transition: 'width 0.3s ease',
      boxShadow: '0 1px 5px rgba(76, 201, 240, 0.3)',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '15px',
      fontWeight: '500',
      color: colors.darkBlue,
    },
    successIcon: {
      fontSize: '48px',
      color: colors.success,
      marginRight: '20px',
      filter: 'drop-shadow(0 4px 6px rgba(6, 214, 160, 0.3))',
    },
    errorAlert: {
      backgroundColor: 'rgba(255, 0, 110, 0.08)',
      color: colors.accent,
      borderRadius: '12px',
      padding: '18px',
      marginTop: '25px',
      display: 'flex',
      alignItems: 'center',
      border: `1px solid rgba(255, 0, 110, 0.2)`,
      boxShadow: '0 4px 15px rgba(255, 0, 110, 0.1)',
    },
    confettiCanvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
    },
    uploadComplete: {
      padding: '20px',
      textAlign: 'center',
      maxWidth: '450px',
      margin: '0 auto',
    },
    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.25)',
      marginRight: '18px',
      fontSize: '20px',
      fontWeight: '700',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    fileInfoLabel: {
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#6c757d',
      fontWeight: '600',
      marginBottom: '5px',
    },
    processingText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#6c757d',
      fontSize: '15px',
      fontWeight: '500',
    },
    pulseDot: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: colors.tertiary,
      marginLeft: '5px',
    },
  };

  // Create enhanced bubble effects for header
  const bubbles = [];
  for (let i = 0; i < 12; i++) {
    const size = Math.floor(Math.random() * 120) + 50;
    const left = Math.floor(Math.random() * 100);
    const top = Math.floor(Math.random() * 120) - 50;
    const opacity = Math.random() * 0.15;
    
    bubbles.push(
      <div 
        key={i}
        style={{
          ...styles.headerBubble,
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          opacity,
        }}
      />
    );
  }

  // Process loading dots animation
  const ProcessingDots = () => {
    return (
      <>
        <motion.span
          style={styles.pulseDot}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          style={styles.pulseDot}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.span
          style={styles.pulseDot}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </>
    );
  };

  return (
    <div style={styles.container}>
      <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.card}
        whileHover={{ boxShadow: '0 25px 70px rgba(0, 0, 0, 0.12), 0 1px 15px rgba(0, 0, 0, 0.1)' }}
      >
        <div style={styles.cardHeader}>
          {bubbles}
          <h2 style={styles.headerTitle}>
            <div style={styles.stepIndicator}>1</div>
            Upload Your Skill Matrix
          </h2>
        </div>
        
        <div style={styles.cardBody}>
          <form onSubmit={handleSkillMatrixUpload}>
            <AnimatePresence mode="wait">
              {uploadState === 'success' ? (
                <motion.div 
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={styles.uploadComplete}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.8, times: [0, 0.6, 1], ease: "easeOut" }}
                  >
                    <CheckCircleFilled style={{ fontSize: '100px', color: colors.success }} />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ 
                      marginTop: '25px', 
                      color: colors.darkBlue, 
                      fontSize: '28px', 
                      fontWeight: '700' 
                    }}
                  >
                    Upload Complete!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{ 
                      marginTop: '15px', 
                      color: '#6c757d', 
                      fontSize: '16px',
                      lineHeight: '1.6'
                    }}
                  >
                    Your skill matrix has been successfully uploaded and processed.
                    The data is now ready for analysis.
                  </motion.p>
                  
                  {fileInfo?.skillMatrix && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      style={styles.infoCard}
                    >
                      <p style={{ 
                        margin: 0, 
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '1.6'
                      }}>
                        {fileInfo.skillMatrix}
                      </p>
                    </motion.div>
                  )}
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    type="button"
                    style={{ ...styles.button, ...styles.primaryButton, marginTop: '35px' }}
                    onClick={resetUpload}
                    whileHover={styles.primaryButtonHover}
                  >
                    Upload Another File
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    ref={uploadAreaRef}
                    style={{
                      ...styles.uploadArea,
                      ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {selectedFile ? (
                      <div style={{ width: '100%' }}>
                        <motion.div 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          style={styles.fileInfo}
                        >
                          <FileExcelOutlined style={styles.fileIcon} />
                          <div style={styles.fileDetails}>
                            <div style={styles.fileInfoLabel}>Selected File</div>
                            <p style={styles.fileName} title={selectedFile.name}>
                              {selectedFile.name}
                            </p>
                            <p style={styles.fileSize}>
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {uploadState !== 'uploading' && (
                            <motion.div
                              whileHover={styles.deleteButtonHover}
                              whileTap={{ scale: 0.95 }}
                            >
                              <DeleteOutlined 
                                style={styles.deleteButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetUpload();
                                }}
                              />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        {uploadState === 'uploading' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.progressContainer}
                          >
                            <div style={styles.progressText}>
                              <span>Uploading & Processing</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div style={styles.progressBarWrapper}>
                              <motion.div 
                                style={styles.progressBar}
                                initial={{ width: '0%' }}
                                animate={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <motion.p 
                              style={styles.processingText}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              Please wait while we analyze your skill matrix
                              <ProcessingDots />
                            </motion.p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        animate={{ 
                          y: [0, -12, 0],
                          transition: { 
                            repeat: Infinity, 
                            duration: 2.5,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <CloudUploadOutlined style={styles.uploadIcon} />
                        <p style={styles.uploadPrompt}>
                          {uploadState === 'dragging' 
                            ? 'Drop your Excel file here' 
                            : 'Drag & Drop your Excel file here'}
                        </p>
                        <p style={styles.uploadHint}>
                          or click to browse from your device
                        </p>
                        <motion.p
                          style={{ color: '#6c757d', fontSize: '14px', marginTop: '15px' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          Supported formats: .xlsx, .xls
                        </motion.p>
                      </motion.div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  
                  {uploadError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={styles.errorAlert}
                    >
                      <motion.span 
                        style={{ 
                          marginRight: '15px', 
                          fontSize: '22px', 
                          color: colors.accent 
                        }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.2
                        }}
                      >
                        ⚠️
                      </motion.span>
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>
                        {uploadError}
                      </span>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
                  >
                    <motion.button
                      type="button"
                      style={{
                        ...styles.button,
                        ...styles.secondaryButton,
                      }}
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploadState === 'uploading'}
                      whileHover={styles.secondaryButtonHover}
                      whileTap={{ scale: 0.97 }}
                    >
                      <UploadOutlined style={{ marginRight: '10px', fontSize: '18px' }} />
                      Browse Files
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
                      }}
                      disabled={!selectedFile || uploadState === 'uploading'}
                      whileHover={(!selectedFile || uploadState === 'uploading') ? {} : styles.primaryButtonHover}
                      whileTap={(!selectedFile || uploadState === 'uploading') ? {} : { scale: 0.97 }}
                    >
                      {uploadState === 'uploading' ? (
                        <>
                          <LoadingOutlined style={{ marginRight: '10px', fontSize: '18px' }} spin />
                          Processing...
                        </>
                      ) : (
                        <>
                          Upload Skill Matrix
                          <motion.span
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
                              borderRadius: '12px',
                              opacity: 0
                            }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 2, 
                              ease: "easeInOut" 
                            }}
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
      
      {/* Quick tips section */}
      {!selectedFile && uploadState !== 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: '25px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '14px',
            padding: '22px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h3 style={{ 
            margin: 0, 
            marginBottom: '15px', 
            fontSize: '18px',
            color: colors.darkBlue,
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.accent} 100%)`,
              marginRight: '10px',
              fontSize: '14px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}>!</span>
            Tips for best results
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
            <li style={{ marginBottom: '8px' }}>Make sure your Excel file is properly formatted with clear headers</li>
            <li style={{ marginBottom: '8px' }}>Data should be organized in sheets with consistent structure</li>
            <li style={{ marginBottom: '8px' }}>For large files, please allow additional processing time</li>
            <li>Save your work before uploading to avoid data loss</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default UploadSkillMatrix;