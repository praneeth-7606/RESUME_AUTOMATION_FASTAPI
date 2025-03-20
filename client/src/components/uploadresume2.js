import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadOutlined, FilePdfOutlined, FileWordOutlined, FileTextOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const UploadResume = ({ setFilePaths, setFileInfo, fileInfo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  // Theme colors
  const colors = {
    primary: '#4361ee',
    secondary: '#3f37c9',
    success: '#4cc9f0',
    accent: '#f72585',
    light: '#f8f9fa',
    dark: '#212529',
  };

  // Trigger success animation
  const triggerSuccessAnimation = () => {
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      });
      
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [colors.primary, colors.success, colors.accent],
      });
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
        if (file && (file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.txt'))) {
          setSelectedFile(file);
          setUploadState('idle');
          setUploadError(null);
        } else {
          setUploadError('Please select a valid file (.pdf, .docx, or .txt)');
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

  // Get file icon based on file type
  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) {
      return <FilePdfOutlined style={{ ...styles.fileIcon, color: '#ff5722' }} />;
    } else if (fileName.endsWith('.docx')) {
      return <FileWordOutlined style={{ ...styles.fileIcon, color: '#2b579a' }} />;
    } else {
      return <FileTextOutlined style={{ ...styles.fileIcon, color: '#607d8b' }} />;
    }
  };

  // Simulate progress for better UX
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 1;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95;
      }
      setUploadProgress(progress);
    }, 200);
    return interval;
  };

  // Handler for resume upload
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadState('uploading');
    setUploadError(null);
    setUploadProgress(0);
    
    const progressInterval = simulateProgress();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/resume', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      if (response.ok) {
        setFilePaths(prev => ({ ...prev, resume: data.file_path }));
        setFileInfo(prev => ({
          ...prev,
          resume: `File uploaded: ${data.filename}. Text extracted successfully.`
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

  // Custom styles
  const styles = {
    container: {
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: '"Poppins", sans-serif',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
      border: 'none',
      transition: 'all 0.3s ease',
    },
    cardHeader: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: 'white',
      padding: '20px 30px',
      position: 'relative',
      overflow: 'hidden',
    },
    headerTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
    },
    headerBubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    cardBody: {
      padding: '30px',
    },
    uploadArea: {
      border: `2px dashed ${colors.primary}`,
      borderRadius: '12px',
      padding: '40px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: colors.light,
      position: 'relative',
      minHeight: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadAreaDragging: {
      backgroundColor: 'rgba(67, 97, 238, 0.05)',
      borderColor: colors.success,
      boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
    },
    uploadIcon: {
      fontSize: '80px',
      color: colors.primary,
      margin: '0 auto 15px',
      display: 'block',
      transition: 'all 0.3s ease',
    },
    uploadPrompt: {
      fontSize: '18px',
      fontWeight: '500',
      color: colors.dark,
      marginBottom: '8px',
    },
    uploadHint: {
      color: '#6c757d',
      marginBottom: '0',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: 'white',
      marginLeft: '10px',
      boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
      minWidth: '180px',
    },
    secondaryButton: {
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      color: colors.primary,
    },
    infoCard: {
      marginTop: '20px',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: 'rgba(76, 201, 240, 0.1)',
      borderLeft: `5px solid ${colors.success}`,
    },
    fileInfo: {
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '15px',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    fileIcon: {
      fontSize: '40px',
      marginRight: '15px',
    },
    fileDetails: {
      flex: 1,
    },
    fileName: {
      fontWeight: '600',
      fontSize: '16px',
      marginBottom: '2px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '250px',
    },
    fileSize: {
      color: '#6c757d',
      fontSize: '14px',
    },
    deleteButton: {
      color: colors.accent,
      fontSize: '18px',
      cursor: 'pointer',
    },
    progressContainer: {
      marginTop: '20px',
    },
    progressBarWrapper: {
      height: '8px',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      borderRadius: '4px',
      margin: '10px 0',
      overflow: 'hidden',
      position: 'relative',
    },
    progressBar: {
      height: '100%',
      borderRadius: '4px',
      background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
      transition: 'width 0.3s ease',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: colors.dark,
    },
    successIcon: {
      fontSize: '40px',
      color: colors.success,
      marginRight: '15px',
    },
    errorAlert: {
      backgroundColor: 'rgba(247, 37, 133, 0.1)',
      color: colors.accent,
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
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
      maxWidth: '400px',
      margin: '0 auto',
    },
  };

  // Create bubble effects for header
  const bubbles = [];
  for (let i = 0; i < 8; i++) {
    const size = Math.floor(Math.random() * 100) + 50;
    const left = Math.floor(Math.random() * 100);
    const top = Math.floor(Math.random() * 100) - 50;
    const opacity = Math.random() * 0.1;
    
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

  return (
    <div style={styles.container}>
      <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.cardHeader}>
          {bubbles}
          <h2 style={styles.headerTitle}>
            <span style={{ marginRight: '15px', fontSize: '28px' }}>2</span>
            Upload Your Resume
          </h2>
        </div>
        
        <div style={styles.cardBody}>
          <form onSubmit={handleResumeUpload}>
            <AnimatePresence mode="wait">
              {uploadState === 'success' ? (
                <motion.div 
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  style={styles.uploadComplete}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  >
                    <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{ marginTop: '20px', color: colors.dark }}
                  >
                    Upload Complete!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    style={{ marginTop: '10px', color: '#6c757d' }}
                  >
                    Your resume has been successfully uploaded and processed.
                  </motion.p>
                  
                  {fileInfo?.resume && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      style={styles.infoCard}
                    >
                      <p style={{ margin: 0, fontWeight: '500' }}>
                        {fileInfo.resume}
                      </p>
                    </motion.div>
                  )}
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    type="button"
                    style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
                    onClick={resetUpload}
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
                          {getFileIcon(selectedFile.name)}
                          <div style={styles.fileDetails}>
                            <p style={styles.fileName} title={selectedFile.name}>
                              {selectedFile.name}
                            </p>
                            <p style={styles.fileSize}>
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {uploadState !== 'uploading' && (
                            <DeleteOutlined 
                              style={styles.deleteButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                resetUpload();
                              }}
                            />
                          )}
                        </motion.div>
                        
                        {uploadState === 'uploading' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.progressContainer}
                          >
                            <div style={styles.progressText}>
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div style={styles.progressBarWrapper}>
                              <motion.div 
                                style={styles.progressBar}
                                initial={{ width: '0%' }}
                                animate={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
                              Please wait while we process your file
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          transition: { 
                            repeat: Infinity, 
                            duration: 2,
                            repeatType: "reverse"
                          }
                        }}
                      >
                        <CloudUploadOutlined style={styles.uploadIcon} />
                        <p style={styles.uploadPrompt}>
                          {uploadState === 'dragging' 
                            ? 'Drop your file here' 
                            : 'Drag & Drop your resume file here'}
                        </p>
                        <p style={styles.uploadHint}>
                          Supported formats: PDF, DOCX, TXT
                        </p>
                      </motion.div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="resume"
                  />
                  
                  {uploadError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={styles.errorAlert}
                    >
                      <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
                      {uploadError}
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
                  >
                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        ...styles.secondaryButton,
                      }}
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploadState === 'uploading'}
                    >
                      <UploadOutlined style={{ marginRight: '8px' }} />
                      Browse Files
                    </button>
                    
                    <button
                      type="submit"
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
                      }}
                      disabled={!selectedFile || uploadState === 'uploading'}
                    >
                      {uploadState === 'uploading' ? (
                        <>
                          <LoadingOutlined style={{ marginRight: '8px' }} spin />
                          Processing...
                        </>
                      ) : (
                        'Upload Resume'
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadResume;