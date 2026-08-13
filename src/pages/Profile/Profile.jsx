import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faTractor,
  faLeaf,
  faRulerCombined,
  faSeedling,
  faCow,
  faClock,
  faShoppingCart,
  faAward,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Farm Street, Farmland",
    farmName: "Green Fields",
    farmType: "Organic Farming",
    landArea: "50 Acres",
    cropsGrown: "Wheat, Corn, Vegetables",
    livestock: "Cattle, Poultry",
    experience: "10 Years",
    market: "Local Market & Online Sales",
    certifications: "Organic Certified",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Farmer Profile</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ProfileItem icon={faUser} label="Name" value={profile.name} />
          <ProfileItem icon={faEnvelope} label="Email" value={profile.email} />
          <ProfileItem icon={faPhone} label="Phone" value={profile.phone} />
          <ProfileItem icon={faMapMarkerAlt} label="Address" value={profile.address} />
          <ProfileItem icon={faTractor} label="Farm Name" value={profile.farmName} />
          <ProfileItem icon={faLeaf} label="Farm Type" value={profile.farmType} />
          <ProfileItem icon={faRulerCombined} label="Land Area" value={profile.landArea} />
          <ProfileItem icon={faSeedling} label="Crops Grown" value={profile.cropsGrown} />
          <ProfileItem icon={faCow} label="Livestock" value={profile.livestock} />
          <ProfileItem icon={faClock} label="Experience" value={profile.experience} />
          <ProfileItem icon={faShoppingCart} label="Market" value={profile.market} />
          <ProfileItem icon={faAward} label="Certifications" value={profile.certifications} />
        </div>

        <button
          onClick={handleEditClick}
          className="mt-6 mx-auto w-1/3 min-w-[150px] bg-yellow-500 text-white py-2 rounded-lg 
             hover:bg-yellow-600 shadow-md transition flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Profile
        </button>

      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-800">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.keys(profile).slice(0, 4).map((key) => (
                <div key={key}>
                  <label className="block text-md font-semibold text-gray-600">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedProfile[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
              {Object.keys(profile).slice(4, 8).map((key) => (
                <div key={key}>
                  <label className="block text-md font-semibold text-gray-600">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedProfile[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
              {Object.keys(profile).slice(8, 12).map((key) => (
                <div key={key}>
                  <label className="block text-md font-semibold text-gray-600">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={key}
                    value={updatedProfile[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
    <FontAwesomeIcon icon={icon} className="text-green-600 text-sm mr-3" />
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-sm text-gray-400">{value}</p>
    </div>
  </div>
);

export default Profile;