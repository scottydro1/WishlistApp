import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { saveTaskData } from "../contexts/AWSSendTask";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../contexts/UserContext";
import { fetchTasksFromLambda } from "../contexts/AWSfetchTask";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controls task modal visibility
  const [newTask, setNewTask] = useState({ time: "", description: "" });
  const [activePicker, setActivePicker] = useState(""); // Tracks whether editing startDate or endDate
  const [editingTask, setEditingTask] = useState(null); // Tracks the task being edited or null for new task
  const { user } = useContext(UserContext);
  const userid = user?.attributes?.sub;

  const [newTaskDetails, setNewTaskDetails] = useState({
    title: "",
    startDate: "",
    endDate: "",
    taskid: "",
    userId: userid,
  });

  const [allTasks, setAllTasks] = useState([]);

  const fetchtasks = async (userid) => {
    try {
      const fetchedtasks = await fetchTasksFromLambda(userid);
      setAllTasks(fetchedtasks); // Save fetched tasks to state
      console.log(fetchedtasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to open the modal for a new task
  const openModalForNewTask = () => {
    setEditingTask(null); // Clear any existing editing state
    setNewTaskDetails({
      title: "",
      startDate: selectedDate.toISOString().split("T")[0],
      endDate: selectedDate.toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      appointmentType: "",
      location: "",
      otherLocation: "",
    });
    setIsModalVisible(true); // Open the modal
  };

  // Function to open the modal for editing an existing task
  const openModalForEditing = (task) => {
    setEditingTask(task); // Set the task being edited
    setNewTaskDetails(task); // Populate modal with task details
    setIsModalVisible(true); // Open the modal
  };

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(selectedDate.getDate() + i - 3); // Show 3 days before and after the selected date
    return day;
  });

  const handleDatePress = (date) => {
    setSelectedDate(date);
    const tasksForDate = allTasks.filter(
      (task) => task.date === date.toDateString() // Match the `date` property with the pressed date
    );
    setTasksByDate((prev) => ({
      ...prev,
      [date.toDateString()]: tasksForDate, // Update the tasksByDate state for the selected date
    }));
  };

  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const onDateSelected = (date) => {
    setSelectedDate(date);
    closeDatePicker();
  };

  const openTaskModal = () => {
    setNewTask({ time: "", description: "" });
    setIsModalVisible(true);
  };

  const closeTaskModal = () => {
    setIsModalVisible(false);
  };

  const saveTask = async () => {
    if (!newTaskDetails.title) {
      alert("Title, Start Date, and Start Time are required!");
      return;
    }
    const uniqueTaskId = uuidv4(); // Generate a unique taskid
    const task = {
      ...newTaskDetails,
      date: selectedDate.toDateString(),
      taskid: uniqueTaskId,
    };
    // Call the AWS save function
    await saveTaskData(task);

    setTasksByDate((prev) => {
      const tasksForDate = prev[selectedDate.toDateString()] || [];
      if (editingTask) {
        // Update existing task
        const updatedTasks = tasksForDate.map((t) =>
          t === editingTask ? task : t
        );
        return { ...prev, [selectedDate.toDateString()]: updatedTasks };
      } else {
        // Add new task
        return {
          ...prev,
          [selectedDate.toDateString()]: [...tasksForDate, task],
        };
      }
    });

    setEditingTask(null); // Clear editing state
    setNewTaskDetails({ title: "", startDate: "", endDate: "" }); // Reset modal data
    setIsModalVisible(false); // Close the modal
  };

  const tasksForSelectedDate = tasksByDate[selectedDate.toDateString()] || [];

  useEffect(() => {
    if (userid) {
      fetchtasks(userid);
    }
  }, [userid]);


  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <Header title="Daily Planner" />

      <View style={styles.OverallDashBoardView_BecauseYouNeedAnOverAllViewForFutureReferenceBryant_BelowTheHeader}>
        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          {/* Scrollable Days */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysScrollWheel}
          >
            {daysInWeek.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => handleDatePress(date)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Date Picker */}
          <TouchableOpacity style={styles.datePickerContainer} onPress={openDatePicker}>
            <Text style={styles.datePickerText}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks Section */}
        <View style={styles.tasksContainer}>
          <View style={styles.tasksHeader}>
            <Text style={styles.tasksTitle}>Tasks & Appointments</Text>
            <TouchableOpacity onPress={openTaskModal}>
              <Image
                source={require("../assets/img/dashboard/appointments.png")} // Updated to new location
                style={styles.addTaskIcon}
              />
            </TouchableOpacity>
          </View>

          {tasksForSelectedDate.length > 0 ? (
            <FlatList
              data={tasksForSelectedDate}
              keyExtractor={(item, index) => `${item.startTime}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.taskItem}>
                  <MaterialIcons name={item.appointmentIcon} size={20} color="#4ca3fc" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.taskTime}>
                      {item.startTime} - {item.endTime}
                    </Text>
                    <Text style={styles.taskDescription}>{item.title}</Text>
                    <Text style={styles.taskDescription}>
                      {item.appointmentType} | {item.location}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noTasksText}>No tasks or appointments for this date.</Text>
          )}
        </View>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>
                  {editingTask ? "Edit Appointment" : "Add Appointment"}
                </Text>
              </View>

              {/* Modal Body */}
              <View style={styles.modalBody}>
                {/* Title */}
                <Text style={styles.label}>
                  Title <Text style={styles.requiredAsterisk}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter Title"
                  value={newTaskDetails.title}
                  onChangeText={(text) =>
                    setNewTaskDetails((prev) => ({ ...prev, title: text }))
                  }
                />

                {/* Appointment Type Dropdown */}
                <Text style={styles.label}>Appointment Type</Text>
                <Picker
                  selectedValue={newTaskDetails.appointmentType}
                  onValueChange={(value) => {
                    setNewTaskDetails((prev) => ({
                      ...prev,
                      appointmentType: value.type,
                      appointmentIcon: value.icon, // Store the icon in the state
                    }));
                  }}
                  style={styles.inputField}
                >
                  {[
                    { type: "Medical Appointment", icon: "hospital" },
                    { type: "Education Appointment", icon: "school" },
                    { type: "Team Meeting", icon: "group" },
                    { type: "Staffing", icon: "work" },
                    { type: "Personal Task", icon: "person" },
                    { type: "Home Task", icon: "home" },
                    { type: "Finance", icon: "attach-money" },
                    { type: "Shopping", icon: "shopping-cart" },
                    { type: "Travel", icon: "flight" },
                    { type: "Fitness", icon: "fitness-center" },
                    { type: "Other", icon: "more-horiz" },
                  ].map((option) => (
                    <Picker.Item
                      key={option.type}
                      label={option.type}
                      value={option}
                    />
                  ))}
                </Picker>

                {/* Start and End Date */}
                <View style={styles.rowContainer}>
                  {/* Start Date */}
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.label}>
                      Start Date <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    <View style={styles.dateInputContainer}>
                      <TextInput
                        style={styles.dateInputField}
                        placeholder="MM-DD-YYYY"
                        value={newTaskDetails.startDate}
                        onChangeText={(text) =>
                          setNewTaskDetails((prev) => ({ ...prev, startDate: text }))
                        }
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setActivePicker("startDate");
                          setIsDatePickerVisible(true);
                        }}
                      >
                        <MaterialIcons name="calendar-today" size={24} color="#4ca3fc" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* End Date */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>
                      End Date <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    <View style={styles.dateInputContainer}>
                      <TextInput
                        style={styles.dateInputField}
                        placeholder="MM-DD-YYYY"
                        value={newTaskDetails.endDate}
                        onChangeText={(text) =>
                          setNewTaskDetails((prev) => ({ ...prev, endDate: text }))
                        }
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setActivePicker("endDate");
                          setIsDatePickerVisible(true);
                        }}
                      >
                        <MaterialIcons name="calendar-today" size={24} color="#4ca3fc" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Start and End Time */}
                <View style={styles.rowContainer}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.label}>
                      Start Time <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.inputField}
                      placeholder="HH:MM AM/PM"
                      value={newTaskDetails.startTime}
                      onChangeText={(text) =>
                        setNewTaskDetails((prev) => ({ ...prev, startTime: text }))
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>
                      End Time <Text style={styles.requiredAsterisk}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.inputField}
                      placeholder="HH:MM AM/PM"
                      value={newTaskDetails.endTime}
                      onChangeText={(text) =>
                        setNewTaskDetails((prev) => ({ ...prev, endTime: text }))
                      }
                    />
                  </View>
                </View>

                {/* Location Dropdown */}
                <Text style={styles.label}>Location</Text>
                <Picker
                  selectedValue={newTaskDetails.location}
                  onValueChange={(value) => {
                    setNewTaskDetails((prev) => ({
                      ...prev,
                      location: value,
                      otherLocation: value === "Other" ? "" : prev.otherLocation,
                    }));
                  }}
                  style={styles.inputField}
                >
                  <Picker.Item label="Microsoft Teams" value="Microsoft Teams" />
                  <Picker.Item label="Webex" value="Webex" />
                  <Picker.Item label="Zoom" value="Zoom" />
                  <Picker.Item label="Other Location" value="Other" />
                </Picker>

                {/* Other Location Input */}
                {newTaskDetails.location === "Other" && (
                  <TextInput
                    placeholder="Enter Location"
                    style={styles.inputField}
                    value={newTaskDetails.otherLocation}
                    onChangeText={(text) =>
                      setNewTaskDetails((prev) => ({ ...prev, otherLocation: text }))
                    }
                  />
                )}
              </View>

              {/* Modal Footer */}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonPrimary}
                  onPress={() => {
                    saveTask();
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={selectedDate}
          onConfirm={onDateSelected}
          onCancel={closeDatePicker}
        />
      </View>


      {/* Footer */}
      <View style={styles.footerContainerWrapper}>
        <Footer currentScreen="Cases" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  OverallDashBoardView_BecauseYouNeedAnOverAllViewForFutureReferenceBryant_BelowTheHeader: {
    flex: 1
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  spacer: {

  },
  calendarContainer: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%", // Ensure it spans the full width of the screen
    alignSelf: "center", // Center the calendar if needed

  },
  daysScrollWheel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dayContainer: {
    width: 50,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#5ac0fa",
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: "#3257cc",
  },
  dayText: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#4ca3fc",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    lineHeight: 40, // Matches the height for centering text
    backgroundColor: "#fff",
    width: 40, // Ensure the width and height are equal for a perfect circle
    height: 40,
    borderRadius: 20, // Half of the width/height for a circle
    borderWidth: 1, // Optional: add border for clarity
    borderColor: "#4ca3fc", // Match the text color or any preferred color
    marginBottom: 7,
  },
  selectedDayText: {
    color: "#4ca3fc",
    fontFamily: "Poppins-Bold",
  },
  datePickerContainer: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#4ca3fc",
    alignItems: "center",
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  dateInputField: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingVertical: 10,
  },
  dateInputIcon: {
    paddingLeft: 10,
  },
  inputFieldFocus: {
    borderColor: "#4ca3fc", // Highlighted border color on focus
  },
  tasksContainer: {

    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 10,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center"
  },

  noTasksText: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
  tasksHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tasksTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#3257cc",
  },
  addTaskIcon: {
    width: 35,
    height: 35,

  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  taskTime: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    marginRight: 8,
    color: "#3d85ff",
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background overlay
  },
  requiredAsterisk: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  modalHeader: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#3257cc",
    textAlign: "center",
  },
  modalBody: {
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4ca3fc",
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  buttonPrimary: {
    backgroundColor: "#5ac0fa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Dashboard;
