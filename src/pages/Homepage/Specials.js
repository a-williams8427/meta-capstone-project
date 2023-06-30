import {
    Box,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import React from "react";
import greekSalad from "../../assets/pictures/greek salad.jpg";
import bruchetta from "../../assets/pictures/bruchetta.jpg";
import lemonCake from "../../assets/pictures/lemon dessert.jpg";

function Specials() {
    const specials = [
        {
            name: "Greek Salad",
            text: "Savor the flavors of Greece with our Greek Salad. Crisp romaine lettuce, juicy tomatoes, and refreshing cucumbers mingle alongside Kalamata olives for authenticity. This salad embodies the essence of the Mediterranean, transporting you to Greece with every bite.",
            image: greekSalad,
        },
        {
            name: "Bruchetta",
            text: "Experience the flavors of Italy with our Bruschetta. Crusty baguette serves as the base, topped with vine-ripened tomatoes, fresh basil, and a drizzle of extra-virgin olive oil. A hint of minced garlic adds a savory kick. Indulge in this rustic Italian delight and savor the simple pleasures of Mediterranean cuisine.",
            image: bruchetta,
        },
        {
            name: "Lemon Cake",
            text: "Savor the refreshing tang of our Lemon Cake. Moist and fluffy, it's infused with zesty lemon flavor. Topped with a creamy lemon frosting and garnished with lemon zest or powdered sugar. Indulge in a slice and let the vibrant flavors brighten your day.",
            image: lemonCake,
        },
    ];

    return (
        <>
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    height: "15vw",
                }}
            />
            {/*TODO: Finish either mocking specials for using an actual API  */}
            <Typography
                variant="h3"
                color="text"
                gutterBottom
                textAlign={"center"}
            >
                Specials
            </Typography>
            <Box marginLeft={"25px"} marginRight={"25px"}>
                <Grid
                    container
                    alignContent={"center"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {specials.map((special) => (
                        <Grid item xs={12} md={4} lg={3} key={special.name}>
                            <Card
                                raised
                                sx={{
                                    maxWidth: "345px",
                                    height: "455px",
                                    borderRadius: "16px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    paddingBottom: "1rem",
                                }}
                            >
                                <CardMedia
                                    sx={{ height: "200px" }}
                                    image={special.image}
                                    title={special.name}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        fontWeight={"bold"}
                                    >
                                        {special.name}
                                    </Typography>
                                    <Typography variant="body">
                                        {special.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default Specials;
