# Meta Front-end developer capstone project

In this project I was tasked with implementing the booking system for a client persona called Little Lemon. I was given a design system and specifications to follow but the implementation was almost entirely up to me. The only thing I didn't have control over was the API for changing the time slots for a given day.

I also included 4 unit tests as required by the specifications for the form. For which I used `React Hook Form` combined with `Yup` to make the client side validation. One challenge I faced while doing this project was the use of `Material UI's` DatePicker and other inputs components in conjunction with React Hook Form. You can't use them by spreading the register props like you would normally. Thankfully React Hook Form has a way around that limitation by using the Controller component. This was a good experience for the limitations of styled components when dealing with other libraries.
