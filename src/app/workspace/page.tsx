"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PenTool, X, Edit2, Trash2 } from "lucide-react";
import NavBar from "../components/nav";

export default function LandingPage() {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNotes, setExpandedNotes] = useState<{ [id: number]: boolean }>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const isLoggedIn = localStorage.getItem("isLogin") === "true";

      if (storedUsername && isLoggedIn) {
        setUsername(storedUsername);
      } else {
        router.push("/welcome");
      }
    }
  }, [router]);

  const handleSave = async () => {
    if (!noteTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const newNote = {
      id: editingId !== null ? editingId : Date.now(),
      title: noteTitle,
      content: noteContent,
    };

    try {
      if (editingId !== null) {
        // Update existing note
        const response = await axios.put(
          `http://localhost:5000/notes/${editingId}`,
          {
            title: noteTitle,
            content: noteContent,
          }
        );
        console.log(response.data.message); // Log success message
      } else {
        // Create new note
        const response = await axios.post("http://localhost:5000/notes", {
          title: noteTitle,
          content: noteContent,
        });
        console.log(response.data.message); // Log success message
      }
    } catch (error: any) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again.");
      return;
    }

    // Update the local state
    if (editingId !== null) {
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === editingId ? newNote : n))
      );
    } else {
      setNotes([...notes, newNote]);
    }

    setNoteTitle("");
    setNoteContent("");
    setEditingId(null);
    setShowPopup(false);
  };

  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((n) => n.id === id);
    if (noteToEdit) {
      setNoteTitle(noteToEdit.title);
      setNoteContent(noteToEdit.content);
      setEditingId(id);
      setShowPopup(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/notes/${id}`);
      console.log(response.data.message); // Log delete message if needed
    } catch (error: any) {
      console.error("Error deleting note:", error);
      alert("Error deleting note. Please try again.");
      return;
    }
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-900"
      } min-h-screen flex flex-col items-center relative`}
    >
      <NavBar
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowPopup={setShowPopup}
      />

      {/* Welcome Message */}
      <div className="text-center mt-20">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Hello, {username ? username : "Guest"}!
        </h1>
        <p className="text-lg mt-4 opacity-80">
          Welcome to <span className="font-semibold text-blue-500">PlanAi</span>
          . Start planning your future today.
        </p>
      </div>

      {/* Centered Floating Add Button */}
      <button
        onClick={() => {
          setShowPopup(true);
          setEditingId(null);
          setNoteTitle("");
          setNoteContent("");
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-5 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:scale-110 transition-all flex items-center justify-center shadow-xl"
      >
        <PenTool className="w-10 h-10 text-white" />
      </button>

      {/* Display Notes */}
      <div className="mt-16 w-full max-w-3xl space-y-6">
        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          filteredNotes.map((n) => {
            const lines = n.content.split("\n");
            const isExpanded = expandedNotes[n.id];
            return (
              <div
                key={n.id}
                className={`p-6 rounded-2xl shadow-md border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } flex flex-col transition-transform hover:scale-[1.02]`}
              >
                <h3 className="text-lg font-medium break-words">{n.title}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap">
                  {isExpanded ? n.content : lines[0]}
                </p>
                {lines.length > 1 && (
                  <button
                    onClick={() =>
                      setExpandedNotes({
                        ...expandedNotes,
                        [n.id]: !isExpanded,
                      })
                    }
                    className="mt-2 text-blue-500 hover:underline self-start"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    onClick={() => handleEdit(n.id)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-1 transition"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pop-up for Writing Notes */}
      {showPopup && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center">
          <div
            className={`p-10 md:p-14 rounded-2xl shadow-2xl w-full max-w-2xl min-h-[400px] relative transition-all duration-500 ${
              theme === "dark"
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            }`}
          >
            {/* Close Button (X) */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-7 h-7" />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              {editingId ? "Edit Your Plan" : "Create a New Plan"}
            </h2>

            {/* Title Input Field */}
            <input
              type="text"
              className={`w-full p-3 mb-4 border rounded-xl focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-400"
                  : "text-gray-900 border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />

            {/* Note Content Textarea */}
            <textarea
              className={`w-full p-4 border rounded-xl focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-400"
                  : "text-gray-900 border-gray-300 focus:ring-blue-500"
              }`}
              rows={6}
              placeholder="Type here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-6 w-full p-4 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 shadow-md transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
