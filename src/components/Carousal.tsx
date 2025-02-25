import React, { useState } from 'react';
import { Box, IconButton, Card, CardMedia } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';  

export const Carousal: React.FC = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
                <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        alt="Product Image"
                        image={images[currentIndex]}
                        sx={{ objectFit: 'contain'}}
                        className='h-[200px] sm:h-[300px] md:h-[400px] contain bg-[#BCCCDC]'
                    />
                </Card>
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',  
                        borderRadius: '50%',
                        zIndex: 10,
                        margin: '1rem',
                    }}
                >
                    <ArrowBack sx={{ color: 'white' }} />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',  
                        borderRadius: '50%',
                        zIndex: 10,
                        margin: '1rem',
                    }}
                >
                    <ArrowForward sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 2,
                    padding: 1,
                    overflowX: 'auto',
                    width: '80%',
                }}
            >
                {images.map((image, index) => (
                    <Box key={index} sx={{ margin: 1 }}>
                        <IconButton onClick={() => handleThumbnailClick(index)} sx={{ padding: 0 }}>
                            <CardMedia
                                component="img"
                                alt={`Thumbnail ${index + 1}`}
                                image={image}
                                sx={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'contain',
                                    border: index === currentIndex ? '2px solid var(--secondary-color)' : '2px solid transparent',
                                    borderRadius: '4px',
                                }}
                            />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
