import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  ArrowRight,
  Lock,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Address, Order, OrderItem } from '../types';
import { SAVED_ADDRESSES } from '../data/mockOrders';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, finalTotal, totalMrp, couponDiscountAmount, appliedCoupon, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1); // 1: ADDRESS, 2: PAYMENT
  const [isProcessing, setIsProcessing] = useState(false);

  // Address State
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    name: 'Aditya Sharma',
    mobile: '9845012345',
    houseFlat: 'Flat 402, Tower B',
    street: 'Prestige Elmwood, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    addressType: 'Home'
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('aditya@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('742');

  // Fallback items if someone visits checkout with empty cart for demo
  const displayItems = items.length > 0 ? items : [
    {
      id: 'demo-1',
      productId: 'mall-m-01',
      product: {
        id: 'mall-m-01',
        name: 'Relaxed Fit French Linen Shirt',
        brand: 'URBAN FORM',
        category: 'men' as const,
        subcategory: 'Shirts',
        price: 1899,
        mrp: 3499,
        discount: 46,
        rating: 4.6,
        reviewsCount: 1420,
        sizes: ['L'],
        colors: [{ name: 'Oatmeal Beige', hex: '#d9cdb8' }],
        images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'],
        description: '',
        material: '',
        specifications: {},
        careInstructions: [],
        inStock: true,
        fastDelivery: true
      },
      selectedSize: 'L',
      selectedColor: { name: 'Oatmeal Beige', hex: '#d9cdb8' },
      quantity: 1
    }
  ];

  const payableTotal = finalTotal > 0 ? finalTotal : 1899;

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!newAddress.name.trim()) errors.name = 'Full Name is required';
    if (!newAddress.mobile.trim() || newAddress.mobile.length < 10)
      errors.mobile = 'Enter valid 10-digit mobile number';
    if (!newAddress.houseFlat.trim()) errors.houseFlat = 'House/Flat number is required';
    if (!newAddress.street.trim()) errors.street = 'Street/Locality is required';
    if (!newAddress.city.trim()) errors.city = 'City is required';
    if (!newAddress.state.trim()) errors.state = 'State is required';
    if (!newAddress.pinCode.trim() || newAddress.pinCode.length < 6)
      errors.pinCode = 'Enter 6-digit PIN code';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNewAddress) {
      if (!validateAddress()) return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    const activeAddress: Address = isAddingNewAddress
      ? newAddress
      : SAVED_ADDRESSES[selectedAddressIndex] || SAVED_ADDRESSES[0];

    const orderItems: OrderItem[] = displayItems.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      brand: item.product.brand,
      image: item.product.images[0],
      size: item.selectedSize,
      colorName: item.selectedColor.name,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Generate distinctive order ID
    const generatedOrderId = `MALL10${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: generatedOrderId,
      createdAt: new Date().toISOString(),
      items: orderItems,
      totalAmount: payableTotal,
      discountAmount: couponDiscountAmount,
      couponCode: appliedCoupon || undefined,
      shippingAddress: activeAddress,
      paymentMethod,
      status: 'Out for Delivery',
      expectedDeliveryDate: 'Today, within 25 minutes',
      trackingStepIndex: 3
    };

    setTimeout(() => {
      createOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success?orderId=${generatedOrderId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-6 sm:space-x-12">
            <div className="flex items-center space-x-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 1 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                1
              </span>
              <span className={`text-xs font-bold tracking-wider uppercase ${currentStep === 1 ? 'text-neutral-900' : 'text-neutral-500'}`}>
                Address
              </span>
            </div>

            <div className="w-8 sm:w-16 h-0.5 bg-neutral-200"></div>

            <div className="flex items-center space-x-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === 2 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                2
              </span>
              <span className={`text-xs font-bold tracking-wider uppercase ${currentStep === 2 ? 'text-neutral-900' : 'text-neutral-500'}`}>
                Payment
              </span>
            </div>

            <div className="w-8 sm:w-16 h-0.5 bg-neutral-200"></div>

            <div className="flex items-center space-x-2 text-neutral-400">
              <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span className="text-xs font-bold tracking-wider uppercase">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Layout: Form on Left, Order Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Step Form Area (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: ADDRESS */}
            {currentStep === 1 && (
              <div className="bg-white border border-neutral-200 rounded-sm p-5 sm:p-6 shadow-subtle space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-neutral-700" />
                    <span>Select Delivery Address</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                    className="text-xs font-bold text-neutral-900 underline flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingNewAddress ? 'Use Saved Address' : 'Add New Address'}</span>
                  </button>
                </div>

                {!isAddingNewAddress ? (
                  <div className="space-y-3">
                    {SAVED_ADDRESSES.map((addr, idx) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressIndex(idx)}
                        className={`p-4 rounded border cursor-pointer transition-all ${
                          selectedAddressIndex === idx
                            ? 'border-neutral-950 bg-neutral-50/60 ring-1 ring-neutral-950'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-neutral-900">{addr.name}</span>
                          <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 rounded text-[10px] font-bold uppercase tracking-wide">
                            {addr.addressType}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {addr.houseFlat}, {addr.street}, {addr.city}, {addr.state} - {addr.pinCode}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">Mobile: {addr.mobile}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleProceedToPayment} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={newAddress.name}
                          onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                        />
                        {addressErrors.name && (
                          <p className="text-[11px] text-red-600 mt-0.5">{addressErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={newAddress.mobile}
                          onChange={e =>
                            setNewAddress({
                              ...newAddress,
                              mobile: e.target.value.replace(/\D/g, '')
                            })
                          }
                          className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                        />
                        {addressErrors.mobile && (
                          <p className="text-[11px] text-red-600 mt-0.5">{addressErrors.mobile}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        House / Flat / Building No. *
                      </label>
                      <input
                        type="text"
                        value={newAddress.houseFlat}
                        onChange={e =>
                          setNewAddress({ ...newAddress, houseFlat: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                      />
                      {addressErrors.houseFlat && (
                        <p className="text-[11px] text-red-600 mt-0.5">{addressErrors.houseFlat}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        Street / Colony / Landmark *
                      </label>
                      <input
                        type="text"
                        value={newAddress.street}
                        onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                      />
                      {addressErrors.street && (
                        <p className="text-[11px] text-red-600 mt-0.5">{addressErrors.street}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">City *</label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">State *</label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={newAddress.pinCode}
                          onChange={e =>
                            setNewAddress({
                              ...newAddress,
                              pinCode: e.target.value.replace(/\D/g, '')
                            })
                          }
                          className="w-full px-3 py-2 border border-neutral-300 rounded focus:border-neutral-900"
                        />
                      </div>
                    </div>
                  </form>
                )}

                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {currentStep === 2 && (
              <div className="bg-white border border-neutral-200 rounded-sm p-5 sm:p-6 shadow-subtle space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-neutral-700" />
                    <span>Choose Payment Method</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 underline"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Payment Selection Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-neutral-950 bg-neutral-50 text-neutral-950 ring-1 ring-neutral-950 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span className="text-xs block">UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-neutral-950 bg-neutral-50 text-neutral-950 ring-1 ring-neutral-950 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-indigo-600" />
                    <span className="text-xs block">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-neutral-950 bg-neutral-50 text-neutral-950 ring-1 ring-neutral-950 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <span className="text-xs block">Cash On Del</span>
                  </button>
                </div>

                {/* Payment Form Fields */}
                <div className="p-4 bg-neutral-50 rounded border border-neutral-200 text-xs space-y-3">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <p className="font-semibold text-neutral-800">Instant UPI Payment</p>
                      <div>
                        <label className="block text-neutral-600 mb-1">Enter UPI VPA ID</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded font-mono text-xs bg-white"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        A payment request will be sent to your Google Pay or PhonePe application.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3">
                      <p className="font-semibold text-neutral-800">Credit or Debit Card</p>
                      <div>
                        <label className="block text-neutral-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded font-mono text-xs bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-neutral-600 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded font-mono text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-600 mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded font-mono text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-neutral-800">Cash on Delivery</p>
                      <p className="text-neutral-600 text-xs">
                        Pay with cash or UPI QR code directly to delivery partner Rahul Kumar upon delivery.
                      </p>
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing Payment & Dispatching...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Place Order (₹{payableTotal.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary Sidebar (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-subtle space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                Order Summary ({displayItems.length} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto">
                {displayItems.map(item => (
                  <div key={item.id} className="py-2.5 flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover object-top rounded-sm border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-semibold text-neutral-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} • Size: {item.selectedSize}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900 font-mono">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Total MRP</span>
                  <span className="font-mono">₹{totalMrp.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="font-mono">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-700 font-semibold uppercase">Free Express</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-950">
                  <span>Payable Amount</span>
                  <span className="font-mono">₹{payableTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-center space-x-1.5 border-t border-neutral-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Express Hyperlocal Delivery with Live GPS Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
