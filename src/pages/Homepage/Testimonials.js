import React from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Rating,
} from "@mui/material";

function Testimonials() {
    const testimonials = [
        {
            rating: 5,
            name: "Emily Thompson",
            text: `"Little Lemon is a Mediterranean culinary gem! Their commitment to preserving traditional recipes while infusing them with a modern twist is truly commendable. The flavors and aromas that emanate from each dish transport you straight to the sun-soaked shores of the Mediterranean. The attention to detail and use of fresh ingredients are evident in every bite. Little Lemon has become my go-to restaurant for a taste of authentic Mediterranean cuisine with a contemporary flair."`,
        },
        {
            rating: 4.5,
            name: "Benjamin Rodriguez",
            text: `"What a delightful experience at Little Lemon! As a fan of Mediterranean cuisine, I was thrilled to discover this restaurant. Their innovative approach to traditional recipes is simply remarkable. Each dish is a work of art, beautifully presented and bursting with flavors that evoke the spirit of the Mediterranean. The blend of classic and modern elements in their menu is executed flawlessly. Little Lemon has captured the essence of the Mediterranean and elevated it to new heights of culinary excellence."`,
        },
        {
            rating: 5,
            name: "Olivia Chen",
            text: `"Little Lemon has become my culinary sanctuary for Mediterranean delights with a modern twist. The moment you step through their doors, you are greeted with a warm and inviting atmosphere. The menu showcases an impressive selection of traditional Mediterranean dishes, reimagined with contemporary flair. The fusion of flavors and textures is an absolute delight for the palate. The attention to detail in every dish is evident, and the service is exceptional. Little Lemon has carved a special place in my heart as the ultimate Mediterranean dining destination."`,
        },
        {
            rating: 5,
            name: "Liam Patel",
            text: `"If you're seeking a taste of the Mediterranean with a modern twist, look no further than Little Lemon. From the first bite to the last, their dishes transport you to a culinary paradise. The menu is thoughtfully curated, featuring a wonderful blend of classic Mediterranean recipes infused with innovative flavors and techniques. The dedication to using authentic ingredients shines through in every dish. Little Lemon is a testament to the harmonious marriage of tradition and innovation, creating a dining experience that leaves you craving for more."`,
        },
    ];
    return (
        <>
            <Box
                bgcolor={"primary.main"}
                marginTop={"8rem"}
                paddingBottom={"2rem"}
            >
                <Typography
                    variant="h3"
                    color="primary.contrastText"
                    gutterBottom
                    textAlign={"center"}
                >
                    Testimonials
                </Typography>
                <Box marginLeft={"25px"} marginRight={"25px"}>
                    <Grid
                        container
                        alignContent={"center"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        rowSpacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {testimonials.map((testimonial) => (
                            <Grid
                                item
                                xs={12}
                                md={4}
                                lg={3}
                                key={testimonial.name}
                            >
                                <Card
                                    raised
                                    sx={{
                                        maxWidth: "405px",
                                        height: "420px",
                                        borderRadius: "16px",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                        >
                                            <Rating
                                                value={testimonial.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </Box>
                                        <Typography variant="body">
                                            {testimonial.text}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ flexGrow: "1" }} />
                                    <CardActions>
                                        <Typography
                                            textAlign={"center"}
                                            fontWeight={"bold"}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Testimonials;
