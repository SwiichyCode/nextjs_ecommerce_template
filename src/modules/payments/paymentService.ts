export interface PaymentService {}

// Créer une interface paymentProvider qui du coup va définir les méthodes pour utiliser le prestataire de paiment
// Créer une ou plusieurs classes qui implémentent cette interface (Stripe, Paypal, etc.)
// Créer une interface PaymentService qui va définir les méthodes pour utiliser le service de paiement
// Créer une classe paymentServiceImplentation qui implémente cette interface (PaymentService)
// Dans cette classe, on va injecter le paymentProvider
