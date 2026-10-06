import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Check,
  Edit2
} from 'lucide-react';
import { SAVED_ADDRESSES } from '../data/mockOrders';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';

export const AccountPage: React.FC = () => {
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'addresses' | 'payments' | 'notifications' | 'help'
  >('profile');

  const [profile, setProfile] = useState({
    name: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    mobile: '+91 98450 12345',
    gender: 'Male',
    location: 'Bengaluru, India'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const navLinks = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package, href: '/orders', badge: orders.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, href: '/wishlist', badge: wishlistCount },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'help', label: 'Help & Concierge', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="pb-6 mb-8 border-b border-neutral-200">
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            My Account
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage your personal profile, addresses, live order tracking and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Sidebar Navigation Tabs (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* User Mini Avatar Header */}
            <div className="bg-white border border-neutral-200 rounded-sm p-5 shadow-subtle flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-base font-serif">
                AS
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-neutral-900 truncate">{profile.name}</h3>
                <p className="text-xs text-neutral-500 truncate">{profile.email}</p>
                <span className="inline-block px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded mt-1 uppercase">
                  MALL Member
                </span>
              </div>
            </div>

            {/* Navigation List */}
            <div className="bg-white border border-neutral-200 rounded-sm divide-y divide-neutral-100 shadow-subtle overflow-hidden text-xs">
              {navLinks.map(item => {
                const Icon = item.icon;
                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-neutral-950"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-neutral-500" />
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full p-3.5 flex items-center justify-between transition-colors text-left ${
                      activeTab === item.id
                        ? 'bg-neutral-900 text-white font-bold'
                        : 'hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950 font-semibold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-neutral-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${activeTab === item.id ? 'text-white' : 'text-neutral-400'}`} />
                  </button>
                );
              })}

              <button
                onClick={() => alert('Signed out of demo session.')}
                className="w-full p-3.5 flex items-center space-x-3 text-red-600 hover:bg-red-50 transition-colors text-left font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Content Display (Col 8) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-8 shadow-subtle text-xs">
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                        Profile Information
                      </h2>
                      <p className="text-[11px] text-neutral-500">
                        Update your primary contact and personal preferences
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1.5 border border-neutral-300 rounded text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 font-bold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {saveSuccess && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Profile information saved successfully.</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded disabled:bg-neutral-50 text-neutral-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded disabled:bg-neutral-50 text-neutral-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={profile.mobile}
                        onChange={e => setProfile({ ...profile, mobile: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded disabled:bg-neutral-50 text-neutral-900 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Gender</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={profile.gender}
                          onChange={e => setProfile({ ...profile, gender: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded disabled:bg-neutral-50 text-neutral-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Location</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={profile.location}
                          onChange={e => setProfile({ ...profile, location: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded disabled:bg-neutral-50 text-neutral-900 font-medium"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="pt-2 flex space-x-3">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-neutral-950 text-white font-bold uppercase rounded hover:bg-black"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-5 py-2.5 border border-neutral-300 text-neutral-700 font-bold uppercase rounded hover:bg-neutral-100"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                    Saved Delivery Addresses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAVED_ADDRESSES.map((addr, i) => (
                      <div key={i} className="p-4 border border-neutral-200 rounded relative">
                        <span className="px-2 py-0.5 bg-neutral-100 font-bold uppercase text-[10px] rounded text-neutral-700 inline-block mb-2">
                          {addr.addressType}
                        </span>
                        <h4 className="font-bold text-neutral-900">{addr.name}</h4>
                        <p className="text-neutral-600 mt-1">
                          {addr.houseFlat}, {addr.street}, {addr.city} - {addr.pinCode}
                        </p>
                        <p className="text-neutral-500 mt-1">Mobile: {addr.mobile}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAYMENTS TAB */}
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                    Saved Payment Methods
                  </h2>
                  <div className="space-y-3">
                    <div className="p-4 border border-neutral-200 rounded flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-bold text-neutral-900">HDFC Bank Millennia Credit Card</p>
                          <p className="text-neutral-500">•••• •••• •••• 8912 | Expiry: 08/28</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                        Default Card
                      </span>
                    </div>

                    <div className="p-4 border border-neutral-200 rounded flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-bold text-neutral-900">Google Pay UPI</p>
                          <p className="text-neutral-500 font-mono">aditya@oksbi</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                    Notification Preferences
                  </h2>
                  <div className="space-y-3 text-neutral-700">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-neutral-900" />
                      <span>SMS & WhatsApp live delivery updates from courier Rahul Kumar</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-neutral-900" />
                      <span>New designer arrival announcements & private lookbook previews</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-neutral-900" />
                      <span>Promotional discounts and flash coupon alerts</span>
                    </label>
                  </div>
                </div>
              )}

              {/* HELP TAB */}
              {activeTab === 'help' && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                    Concierge & Client Care
                  </h2>
                  <div className="space-y-3">
                    <p className="text-neutral-600 leading-relaxed">
                      Our customer care studio is available 7 days a week, 8:00 AM to 11:00 PM IST to assist with orders, sizing guidance, and deliveries.
                    </p>
                    <div className="p-4 bg-neutral-50 rounded border border-neutral-200 space-y-1.5">
                      <p className="font-bold text-neutral-900">Toll-Free Helpline: 1800-200-MALL</p>
                      <p className="text-neutral-600">Email: concierge@mall.internal</p>
                      <p className="text-neutral-500 text-[11px]">Average response time: &lt; 5 minutes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
