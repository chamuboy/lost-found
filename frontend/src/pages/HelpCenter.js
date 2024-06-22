import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
    CssBaseline,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/help.css';

const HelpCenter = () => {
    const helpData = [
        {
            question: 'How to upload a file?',
            answer: 'Toggle the menu by clicking the menu button at the left and click on Add Item. There you can specify the necessary details and upload a file.',
        },
        {
            question: 'How to perform a bid?',
            answer: 'Click on an item which you need to bid. It will display a Bid button as you scroll down if the item is available for the auction.',
        },
        {
            question: 'Where to view the current bids?',
            answer: 'Navigate to the My Items Section using the menu bar. If there are bids made, a button called "View Bids" will appear on the item section.',
        },
        {
            question: 'How to edit an uploaded item?',
            answer: 'Navigate to the My Items Section using the menu bar and there you\'ll see an edit button on each item you have uploaded. Click on that and edit the required fields. The current field values will be displayed for your ease. Make changes and click on the Save button.',
        },
        {
            question: 'How to edit account details?',
            answer: 'Navigate to the My Account Section on the menu bar and you\'ll see the edit buttons there. You can individually edit only the required fields.',
        },
    ];

    return (
        <Container component="main" maxWidth="100%" className="help-center-container">
            <CssBaseline />
            <Box>
                <Typography variant="h4" gutterBottom className="help-center-header">
                    Help Center
                </Typography>
                {helpData.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            className="accordion-summary"
                        >
                            <Typography variant="h6">{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordion-details">
                            <Typography>{item.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Container>
    );
};

export default HelpCenter;
