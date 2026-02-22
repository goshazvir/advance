// /**
//  * Example usage of AdvanceBiButtonWrapper component
//  *
//  * This file demonstrates how to use the AdvanceBiButtonWrapper
//  * to track button clicks with PostHog analytics.
//  */
//
// import React from 'react';
//
// import {Button} from '@mui/material';
// import AdvanceBiButtonWrapper from './AdvanceBiButtonWrapper';
//
// // Example 1: Basic usage with just event ID
// export const BasicExample = () => {
//   return (
//     <AdvanceBiButtonWrapper id='button_clicked'>
//       <Button variant='contained'>Click Me</Button>
//     </AdvanceBiButtonWrapper>
//   );
// };
//
// // Example 2: With event body (additional properties)
// export const WithBodyExample = () => {
//   return (
//     <AdvanceBiButtonWrapper
//       id='account_action_clicked'
//       body={{
//         account_id: '12345',
//         action_type: 'move_money',
//       }}
//     >
//       <Button variant='outlined'>Move Money</Button>
//     </AdvanceBiButtonWrapper>
//   );
// };
//
// // Example 3: With tag for categorization
// export const WithTagExample = () => {
//   return (
//     <AdvanceBiButtonWrapper
//       id='drawer_action_clicked'
//       origin='account_drawer'
//       body={{
//         drawer_section: 'header',
//         button_name: 'close',
//       }}
//     >
//       <Button variant='text'>Close</Button>
//     </AdvanceBiButtonWrapper>
//   );
// };
//
// // Example 4: With custom styling
// export const WithStylingExample = () => {
//   return (
//     <AdvanceBiButtonWrapper
//       id='custom_button_clicked'
//       origin='custom_ui'
//       sx={{
//         width: '100%',
//         display: 'block',
//       }}
//     >
//       <Button fullWidth variant='contained' color='primary'>
//         Full Width Button
//       </Button>
//     </AdvanceBiButtonWrapper>
//   );
// };
//
// // Example 5: Stop propagation to prevent parent handlers
// export const WithStopPropagationExample = () => {
//   const handleParentClick = () => {
//     // Parent click handler
//   };
//
//   return (
//     <div onClick={handleParentClick}>
//       <AdvanceBiButtonWrapper
//         id='stop_propagation_button'
//         origin='nested_button'
//         stopPropagation={true}
//       >
//         <Button variant='contained'>Click me (won't trigger parent)</Button>
//       </AdvanceBiButtonWrapper>
//     </div>
//   );
// };
//
// // Example 6: Real-world usage in a dashboard
// export const RealWorldExample = () => {
//   const handlePaymentClick = () => {
//     // Your business logic here
//     // Navigate to payment page
//   };
//
//   return (
//     <AdvanceBiButtonWrapper
//       id='payment_request_clicked'
//       origin='payments_dashboard'
//       body={{
//         source: 'dashboard_widget',
//         timestamp: new Date().toISOString(),
//       }}
//     >
//       <Button
//         variant='contained'
//         color='secondary'
//         onClick={handlePaymentClick}
//       >
//         Create Payment Request
//       </Button>
//     </AdvanceBiButtonWrapper>
//   );
// };
