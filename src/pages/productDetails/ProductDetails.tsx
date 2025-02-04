import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box, Rating, Accordion, AccordionSummary, AccordionDetails, Container } from "@mui/material";
import { Carousal } from "../../components/Carousal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getProductSlice } from "../../store/productsSlice/userProductSlice";

export const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const { allProducts } = useSelector((state: any) => state.products);
    const [productDetails, setProductDetails] = useState<any>(null);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!allProducts) {
            const fetchData = async () => {
                const res = await dispatch(
                    getProductSlice(id)
                );
                const product = res?.payload
                setProductDetails(product);
            };
            fetchData();
        } else {
            const product = allProducts.data.find((product: any) => product?._id === id);
            setProductDetails(product);
        }
    }, [id, allProducts]);

    if (!productDetails) {
        return <div className="p-4 font-bold text-2xl">Loading..</div>;
    }

    const reviews = [
        { user: "John Doe", rating: 4, review: "Great product! Really useful and high quality." },
        { user: "Jane Smith", rating: 5, review: "Amazing! Exceeded my expectations." },
        { user: "Alice Brown", rating: 3, review: "Good, but the price is a bit high for the features." },
    ];

    const isDescriptionLong = (description: string) => {
        const wordCount = description.split(" ").length;
        return wordCount > 50;
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container className="p-2 w-[80%] mt-6">
            <Card className="flex flex-col items-center gap-4">
                <Carousal images={productDetails?.image} />
                <CardContent className="p-2 text-left w-[95%] sm:w-[80%] flex gap-4 flex-col">
                    <Box className="flex flex-col md:flex-row justify-between items-start md:flex-center">
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                            {productDetails?.title}
                        </Typography>
                        <Rating size="large" name="read-only" value={3.5} precision={0.5} readOnly />
                    </Box>
                    <Box component={'section'} className="flex gap-2">
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            Price:
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            ${productDetails?.price}
                        </Typography>
                    </Box>

                    {isDescriptionLong(productDetails?.description) ? (
                        <Accordion
                            sx={{ boxShadow: 'none', border: 'none' }}
                            expanded={expanded === "panel1"}
                            onChange={handleChange("panel1")}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="description-content"
                                id="description-header"
                                sx={{ p: 0 }}
                            >
                                <Box className="flex flex-col md:flex-row gap-2 w-full">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: '20%', minWidth: '6rem' }}>
                                        Description
                                    </Typography>
                                    {expanded === "panel1" ? null : (
                                        <Typography variant="body1" sx={{ width: { xs: '75%', md: '100%' }, flexShrink: 0 }}>
                                            {productDetails?.description.slice(0, 100)}...
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">{productDetails?.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ) : (
                        <Box component={'section'} className="flex flex-col md:flex-row gap-2">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: '20%', minWidth: '6rem' }}>
                                Description
                            </Typography>
                            <Typography variant="body1">{productDetails?.description}</Typography>
                        </Box>
                    )}

                    <Box component={'section'} className="flex flex-col md:flex-row gap-2">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: '20%', minWidth: '6rem' }}>
                            Stocks Left
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                            {productDetails?.quantity}
                        </Typography>
                    </Box>

                    <Box component={'section'} className="flex gap-2 w-full flex-col md:flex-row">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: { xs: '100%', md: '20%' } }}>
                            Ratings and Reviews
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: '40rem' }}>
                            {reviews.map((review, index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                    >
                                        <Typography component="span" sx={{ width: { xs: '50%', sm: '66%' }, flexShrink: 0 }}>
                                            {review.user}</Typography>
                                        <Rating size="small" name="read-only" value={review.rating} readOnly />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2">{review.review}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};
