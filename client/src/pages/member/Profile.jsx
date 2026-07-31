import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import MemberSidebar from "../../components/dashboard/MemberSidebar";
import { getProfile, updateProfile } from "../../services/userService";
import "./Profile.css";

const Profile = () => {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    skills: "",
    createdAt: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

 const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getProfile(token);

    console.log("Profile API Response:", data);

    setProfile({
      name: data.name || "",
      email: data.email || "",
      role: data.role || "",
      skills: data.skills || "",
      createdAt: data.createdAt || "",
    });

  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await updateProfile(
        {
          name: profile.name,
          email: profile.email,
          skills: profile.skills,
        },
        token
      );

      setProfile(res.user);

      setIsEditing(false);

      alert("Profile Updated Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  console.log("isEditing =", isEditing);
console.log("Profile component loaded");

  return (
    <div className="profile-page">

      <MemberSidebar />

      <div className="profile-main">

        <Navbar />

        <div className="profile-container">

  <div className="profile-card">

    <div className="profile-avatar">
      👤
    </div>

    <h2>My Profile</h2>

    {/* Name */}
    <div className="profile-group">
      <label>Name</label>

      {isEditing ? (
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      ) : (
        <div className="profile-value">
          {profile.name}
        </div>
      )}
    </div>

    {/* Email */}
    <div className="profile-group">
      <label>Email</label>

      {isEditing ? (
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      ) : (
        <div className="profile-value">
          {profile.email}
        </div>
      )}
    </div>

    {/* Role */}
    <div className="profile-group">
      <label>Role</label>

      <div className="profile-value">
        {profile.role}
      </div>
    </div>

    {/* Joined */}
    <div className="profile-group">
      <label>Joined</label>

      <div className="profile-value">
        {profile.createdAt
          ? new Date(profile.createdAt).toLocaleDateString()
          : ""}
      </div>
    </div>

    {/* Skills */}
    <div className="profile-group">
      <label>Skills</label>

      {isEditing ? (
        <input
          type="text"
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="React, MongoDB..."
        />
      ) : (
        <div className="profile-value">
          {profile.skills || "No skills added"}
        </div>
      )}
    </div>

    {/* Buttons */}
    {!isEditing ? (
      <button
        className="edit-btn"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
    ) : (
      <div className="profile-buttons">

        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

        <button
          className="cancel-btn"
          onClick={() => {
            setIsEditing(false);
            fetchProfile();
          }}
        >
          Cancel
        </button>

      </div>
    )}

  </div>

</div>

      </div>

    </div>
  );
};

export default Profile;