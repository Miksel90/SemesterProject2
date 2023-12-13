# SemesterProject2 - Vintage$Brokers

![readme-img](https://github.com/Miksel90/Miksel90/blob/main/images/VintageBrokers.PNG)

This is the repository for my semester project 2 at Noroff for Christmas 2023. the task was to use the skills we had learned over the past three semesters to create an auction site.

## Description

This is my end of the third semester project at Noroff. We had five weeks to plan our approach with a Gannt chart & a Kanban project board, design a prototype in Figma and then build an auction site using the Noroff Auction API. We also had to use a CCS Framework, so I chose Bootstrap since we had worked with that previously. The content is dynamically built by fetching data from the API. The API is a bit limited so some things are handled a bit creative, like fetching all the specific profile auction wins.

### User Stories

Our Auction site had to fulfill some specific user stories:

- A user with a stud.noroff.no email may register
- A registered user may login
- A registered user may logout
- A registered user may update their avatar
- A registered user may view their total credit
- A registered user may create a Listing with a title, deadline date, media gallery and description
- A registered user may add a Bid to another user’s Listing
- A registered user may view Bids made on a Listing
- An unregistered user may search through Listings

### Design Choices

We could design the site as we wanted, but had to remember what we had learned about user accessability and UX design from the previous semesters.
After some brainstorming, the style I was aiming for was a vintage luxurious site, that specialized in expensive vintage clothes and jewelry. I wanted the site te feel classic and luxurious so I went for black, gold and a hint of kings blue for the palette. It was difficult to work with the gold color, since I could not get it to look gold enough, as it looked more yellow than gold. I started out with a lot of kings blue, especially on modals, but i toned it down as black and gold, with opacity fit the design better. I went with "Playfair display" as my header font as it displayed large text quite nicely. for my body i first used "Comfortaa" but it actually made all my text look like a mess, especially with large text parts. therefore I switched to "Raleway".

I wanted to play around some with Bootstrap so I added an image carousel to the main page for esthetic purposes. If I had more time i would probably do something more with it like dynamically build from tags in auctions. The profile pages got a bit long when i had all the different sections flexing like a column, so I decided to add tabs to easily switch between different sections. I also added some parallax scrolling on my auctions site. I wanted to work with modals so the pages looked cleaner without a lot of input fields.

#### Images

I had some challenges getting all images to fit properly, as object-fit-contain worked better on some images, and object-fit-cover worked better some, even though i could not get the entire image to fit properly. Would probably be easier with more control over the image original sizes.

All images are created with Bing AI Image generator.

#### Style Guide

You can look through my Style guide and Figma prototype here:

- https://www.figma.com/file/NnSpGExZnpgSxMMiXRO8v1/Vintage%24Broker?type=design&node-id=16%3A319&mode=design&t=JamyyPCSUfS0AZBm-1

##Built With

- HTML
- CSS/SASS/SCSS
- Javascript

### FrameWorks

- Bootstrap 5.3.1

##Innstalling

This is a simple website for school. You can simply clone the repo, open it and install some minor dependencies.

### Running

Initialize git

```
git init
```

Install dependencies

```
npm i
```

Build SASS

```
npm run build
```

```
npm run watch
```

##Contributing

Open a pull request so code can be reviewed.

## Contact

My LinkedIn page

- linkedin.com/in/mikael-selstad-921251279

## Acknowledgments

I would like to thank my peers for constant feedback and help with code, and a special thanks to Hans AKA Spookyrumble for always lending a helping hand!
