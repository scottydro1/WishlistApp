import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    Animated,
    Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../components/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from "../assets/fonts";
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ModalAPI } from "../components/AlertModal";
import AlertModal from "../components/AlertModal";

const AddCase = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setCaseData({ ...caseData, startDate: formattedDate }); // Update start date in case data
        hideDatePicker(); // Close the modal
    };

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [currentStep, setCurrentStep] = useState("type");
    const [selectedCategory, setselectedCategory] = useState("sibling");
    const [caseData, setCaseData] = useState({
        caseName: "",
        startDate: "",
        location: "",
        caseType: "",
        clientCompo: "",
        priority: "",
        caseGoals: [],
        associatedAgencies: [],
        clients: [],
        familyMembers: [],
    });

    const caseClientType = ["Sibling Set", "Mental Health Support", "Housing Assistance"];

    const caseTypes = ["Child Welfare", "Mental Health Support", "Housing Assistance"];
    const priorities = ["High", "Medium", "Low"];
    const goals = ["Secure housing", "Provide therapy sessions", "Reunification"];
    const agencies = ["Department of Housing", "Family Services", "Health Department"];

    const [contact, setContact] = useState({ name: "", phone: "", relationship: "" });
    const [familyMember, setFamilyMember] = useState({ name: "", relation: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [clientComposition, setclientComposition] = useState("single")
    const [casePriority, setcasePriority] = useState("low")

    const handleSubmit = () => {
        console.log("Case Data:", caseData);
        Alert.alert("Submission Complete", "Case data has been submitted successfully.");
    };

    const renderheaderBtns_addcase = () => (
        <View style={styles.headerBtns_addcase}>
            {/* type Options Button */}
            <LinearGradient
                colors={currentStep === "type" ? ["#FF897A", "#FF6F61"] : ["#fff", "#fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.headerButton_addcase,
                    currentStep === "type" && styles.headerBtnActive_addcase,
                ]}
            >
                <TouchableOpacity
                    onPress={() => setCurrentStep("type")}
                    style={[
                        styles.headerBtnText_addcase,
                        currentStep === "type" && styles.headerBtnTextActive_addcase,
                    ]}
                >
                    <Image
                        source={require("../assets/img/ui_icons/flag.png")} // Replace with your email icon
                        style={[
                            styles.icon_addcase,
                            { marginBottom: 0, width: 50, height: 50, tintColor: currentStep === "type" ? "#fff" : "#FF6F61" },
                        ]}
                    />
                    <Text numberOfLines={1}
                        style={[
                            styles.headerBtnText_addcase,
                            currentStep === "type" && styles.headerBtnTextActive_addcase, { overflow: "hidden" }
                        ]}
                    >
                        Case Type
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Case Info Button */}
            <LinearGradient
                colors={currentStep === "caseInfo" ? ["#FF897A", "#FF6F61"] : ["#fff", "#fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.headerButton_addcase,
                    currentStep === "caseInfo" && styles.headerBtnActive_addcase,
                ]}
            >
                <TouchableOpacity
                    onPress={() => setCurrentStep("caseInfo")}
                    style={[
                        styles.headerBtnText_addcase,
                        currentStep === "caseInfo" && styles.headerBtnTextActive_addcase,
                    ]}
                >
                    <Image
                        source={require("../assets/img/ui_icons/info.png")} // Replace with your email icon
                        style={[
                            styles.icon_addcase,
                            { marginBottom: 0, width: 50, height: 50, tintColor: currentStep === "caseInfo" ? "#fff" : "#FF6F61" },
                        ]}
                    />
                    <Text
                        style={[
                            styles.headerBtnText_addcase,
                            currentStep === "caseInfo" && styles.headerBtnTextActive_addcase,
                        ]}
                    >
                        Case Info
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* clients Button */}
            <LinearGradient
                colors={currentStep === "clients" ? ["#FF897A", "#FF6F61"] : ["#fff", "#fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.headerButton_addcase,
                    currentStep === "clients" && styles.headerBtnActive_addcase,
                ]}
            >
                <TouchableOpacity
                    onPress={() => setCurrentStep("clients")}
                    style={[
                        styles.headerBtnText_addcase,
                        currentStep === "clients" && styles.headerBtnTextActive_addcase,
                    ]}
                >
                    <Image
                        source={require("../assets/img/ui_icons/contact.png")} // Replace with your email icon
                        style={[
                            styles.icon_addcase,
                            { marginBottom: 0, width: 50, height: 50, tintColor: currentStep === "clients" ? "#fff" : "#FF6F61" },
                        ]}
                    />
                    <Text
                        style={[
                            styles.headerBtnText_addcase,
                            currentStep === "clients" && styles.headerBtnTextActive_addcase,
                        ]}
                    >
                        Clients
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Family Members Button */}
            <LinearGradient
                colors={currentStep === "family" ? ["#FF897A", "#FF6F61"] : ["#fff", "#fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.headerButton_addcase,
                    currentStep === "family" && styles.headerBtnActive_addcase,
                ]}
            >
                <TouchableOpacity
                    onPress={() => setCurrentStep("family")}
                    style={[
                        styles.headerBtnText_addcase,
                        currentStep === "family" && styles.headerBtnTextActive_addcase,
                    ]}
                >
                    <Image
                        source={require("../assets/img/ui_icons/family.png")} // Replace with your email icon
                        style={[
                            styles.icon_addcase,
                            { marginBottom: 0, width: 50, height: 50, tintColor: currentStep === "family" ? "#fff" : "#FF6F61" },
                        ]}
                    />
                    <Text
                        style={[
                            styles.headerBtnText_addcase,
                            currentStep === "family" && styles.headerBtnTextActive_addcase,
                        ]}
                    >
                        Family
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    );
    useEffect(() => {
        async function loadFonts() {
            await useCustomFonts();
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);
    return (
        <View style={styles.container_addcase}>
            {renderheaderBtns_addcase()}

            <Animated.View>
                <AlertModal />

                <Image
                    source={require("../assets/img/ui_icons/square.png")} // Replace with your email icon
                    style={[
                        styles.selector_pointer,
                        {
                            tintColor: selectedCategory === "multi" ? "#EFF8FF" : "#EFF8FF",
                            marginLeft:
                                currentStep === "type"
                                    ? "6%"
                                    : currentStep === "caseInfo"
                                        ? "31%"
                                        : currentStep === "clients"
                                            ? "56%"
                                            : "80%"
                        },
                    ]}
                />
            </Animated.View>
            <Animated.View style={styles.pointer_bar}>
                <View style={styles.point_bar_bg}>
                    <Text style={[styles.composition_cardtext, { fontSize: 15 }]}>
                        {currentStep === "type"
                            ? "Select the category that best fits your case for accurate organization and support."
                            : currentStep === "caseInfo"
                                ? "Enter the general case information."
                                : currentStep === "clients"
                                    ? "Choose previously entered clients or choose to add new clients to the case."
                                    : "Organize the relationships between the entered clients."}
                    </Text>
                </View>
            </Animated.View>

            {currentStep === "type" && (
                <ScrollView style={styles.formContainer_addcase}>
                    <Animated.View style={styles.composition_cardContainer}>
                        {/* Child Welfare */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "childWelfare" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("childWelfare")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/sibling.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "childWelfare" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "childWelfare" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Child Welfare
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "childWelfare" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Safety and well-being of children.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Mental Health Support */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "mentalHealth" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("mentalHealth")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/single.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "mentalHealth" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "mentalHealth" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Mental Health Support
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "mentalHealth" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Supporting mental health needs.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Housing Assistance */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "housing" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("housing")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/single.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "housing" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "housing" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Housing Assistance
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "housing" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Helping individuals find housing.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Domestic Violence Support */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "domesticViolence" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("domesticViolence")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/single.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "domesticViolence" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "domesticViolence" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Domestic Violence Support
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "domesticViolence" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Addressing abuse cases.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Substance Abuse Recovery */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "substanceAbuse" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("substanceAbuse")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/single.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "substanceAbuse" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "substanceAbuse" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Substance Abuse Recovery
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "substanceAbuse" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Overcoming addiction.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Elder Care Support */}
                        <TouchableOpacity
                            style={[
                                styles.composition_optionCard,
                                { backgroundColor: selectedCategory === "elderCare" ? "#22BABB" : "rgba(34, 186, 187, 0.25)" },
                            ]}
                            onPress={() => setselectedCategory("elderCare")}
                        >
                            <Image
                                source={require("../assets/img/ui_icons/single.png")}
                                style={[
                                    styles.composition_cardimage,
                                    { tintColor: selectedCategory === "elderCare" ? "#fff" : "#EFF8FF" },
                                ]}
                            />
                            <View style={styles.composition_titlecontainer}>
                                <Text
                                    style={[
                                        styles.composition_cardTitletext,
                                        { color: selectedCategory === "elderCare" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Elder Care Support
                                </Text>
                                <Text
                                    style={[
                                        styles.composition_cardtext,
                                        { color: selectedCategory === "elderCare" ? "#fff" : "#758694" },
                                    ]}
                                >
                                    Supporting elderly needs.
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>

            )}
            {currentStep === "caseInfo" && (
                <ScrollView style={styles.formContainer_addcase}>
                    <Text style={[styles.label_addcase]}>Case Name:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter case name"
                        value={caseData.caseName}
                        onChangeText={(text) => setCaseData({ ...caseData, caseName: text })}
                    />

                    <Text style={styles.label_addcase}>Start Date:</Text>
                    <TouchableOpacity
                        style={styles.input_addcase}
                        onPress={showDatePicker}
                    >
                        <Text style={[styles.picker_addcase, { color: caseData.startDate ? "#000" : "#A6AEBF" }]}>
                            {caseData.startDate || "Enter start date (YYYY-MM-DD)"}
                        </Text>
                    </TouchableOpacity>

                    {/* Date Picker Modal */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />


                    <Text style={styles.label_addcase}>Location:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter location"
                        value={caseData.location}
                        onChangeText={(text) => setCaseData({ ...caseData, location: text })}
                    />

                    <View style={styles.rowContainer_nomargin}>
                        <Text style={styles.label_addcase}>Client Composition:</Text>
                        <TouchableOpacity
                            style={styles.helpTipButton}
                            onPress={() =>
                                ModalAPI.showAlert(
                                    "Client Composition",
                                    `Select the urgency level for the case to determine its importance:\n\n- Individual: A single client is associated with this case.\n\n- Sibling Set: A group of siblings is involved.`
                                )
                            }
                        >
                            <Text style={styles.helpTipButtonText}>?</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.ButtonGroup_addCase}>
                        <TouchableOpacity style={[styles.ButtonGroupButtonLeft_addCase, {
                            borderColor: clientComposition === "single" ? "#0288D1" : "#0288D1",
                            backgroundColor: clientComposition === "single" ? "#0288D1" : "#fff",
                            borderWidth: clientComposition === "single" ? 3 : 3,
                            width: "50%",
                            borderTopEndRadius: 0,
                            borderBottomEndRadius: 0
                        }]}
                            onPress={() => {
                                setclientComposition("single")
                                setCaseData({ ...caseData, clientCompo: clientComposition });
                            }}>
                            <Text style={[styles.ButtonGroupText_addCase, { color: clientComposition === "single" ? "#fff" : "#0288D1" }]}>
                                SINGLE
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.ButtonGroupButtonRight_addCase, {
                            borderColor: clientComposition === "sibling" ? "#0288D1" : "#0288D1",
                            backgroundColor: clientComposition === "sibling" ? "#0288D1" : "#fff",
                            borderWidth: clientComposition === "sibling" ? 3 : 3,
                            width: "50%",
                            borderTopStartRadius: 0,
                            borderBottomStartRadius: 0

                        }]}
                            onPress={() => {
                                setclientComposition("sibling")
                                setCaseData({ ...caseData, clientCompo: clientComposition });
                            }}>
                            <Text style={[styles.ButtonGroupText_addCase, { color: clientComposition === "sibling" ? "#fff" : "#0288D1" }]}>
                                SIBLING SET
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer_nomargin}>
                        <Text style={styles.label_addcase}>Priority:</Text>
                        <TouchableOpacity
                            style={styles.helpTipButton}
                            onPress={() =>
                                ModalAPI.showAlert(
                                    "Case Priority",
                                    `Select the urgency level for the case to help Social Care determine its importance:\n\n- High: Requires immediate attention and action.\n\n- Medium: Important but can be addressed after high-priority cases.\n\nLow: Non-urgent tasks or cases that can be resolved later.`
                                )
                            }
                        >
                            <Text style={styles.helpTipButtonText}>?</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.ButtonGroup_addCase}>
                        <TouchableOpacity style={[styles.ButtonGroupButtonLeft_addCase, {
                            borderColor: casePriority === "low" ? "#FFE5AD" : "#FFE5AD",
                            backgroundColor: casePriority === "low" ? "#FFD23F" : "#fff",
                            borderWidth: casePriority === "low" ? 3 : 3,
                            width: "33%",
                            borderTopEndRadius: 0,
                            borderBottomEndRadius: 0
                        }]}
                            onPress={() => {
                                setcasePriority("low")
                                setCaseData({ ...caseData, priority: casePriority });
                            }}>
                            <Text style={[styles.ButtonGroupText_addCase, { color: casePriority === "low" ? "#fff" : "#0288D1" }]}>
                                Low
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.ButtonGroupButtonCenter_addCase, {
                            borderColor: casePriority === "medium" ? "#FFE5AD" : "#FFE5AD",
                            backgroundColor: casePriority === "medium" ? "#FF6500" : "#fff",
                            borderWidth: casePriority === "medium" ? 3 : 3,
                            width: "33%",
                            borderTopEndRadius: 0,
                            borderBottomEndRadius: 0,
                            borderStartWidth: 0,
                            borderEndWidth: 0
                        }]}
                            onPress={() => {
                                setcasePriority("medium")
                                setCaseData({ ...caseData, priority: casePriority });
                            }}>
                            <Text style={[styles.ButtonGroupText_addCase, { color: casePriority === "medium" ? "#fff" : "#0288D1" }]}>
                                Medium
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ButtonGroupButtonRight_addCase, {
                            borderColor: casePriority === "high" ? "#FFE5AD" : "#FFE5AD",
                            backgroundColor: casePriority === "high" ? "#FF2929" : "#fff",
                            borderWidth: casePriority === "high" ? 3 : 3,
                            width: "33%",
                            borderTopStartRadius: 0,
                            borderBottomStartRadius: 0

                        }]}
                            onPress={() => {
                                setcasePriority("high")
                                setCaseData({ ...caseData, priority: casePriority });
                            }}>
                            <Text style={[styles.ButtonGroupText_addCase, { color: casePriority === "high" ? "#fff" : "#0288D1" }]}>
                                High
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
            {currentStep === "clients" && (
                <View style={styles.formContainer_addcase}>
                    <Text style={styles.label_addcase}>Contact Name:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter contact name"
                        value={contact.name}
                        onChangeText={(text) => setContact({ ...contact, name: text })}
                    />

                    <Text style={styles.label_addcase}>Phone:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter phone number"
                        value={contact.phone}
                        onChangeText={(text) => setContact({ ...contact, phone: text })}
                    />

                    <Text style={styles.label_addcase}>Relationship:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter relationship"
                        value={contact.relationship}
                        onChangeText={(text) => setContact({ ...contact, relationship: text })}
                    />

                    <TouchableOpacity
                        style={styles.submitButtonText_addcase}
                        onPress={() => {
                            setCaseData({ ...caseData, clients: [...caseData.clients, contact] });
                            setContact({ name: "", phone: "", relationship: "" });
                        }}
                    >
                        <Text style={styles.submitBtnText_addcase}>Add Contact</Text>
                    </TouchableOpacity>
                </View>
            )}
            {currentStep === "family" && (
                <View style={styles.formContainer_addcase}>
                    <Text style={styles.label_addcase}>Search Existing Clients:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter client name"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.submitButtonText_addcase}>
                        <Text style={styles.submitBtnText_addcase}>Search</Text>
                    </TouchableOpacity>

                    <Text style={styles.label_addcase}>Add New Family Member:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter name"
                        value={familyMember.name}
                        onChangeText={(text) => setFamilyMember({ ...familyMember, name: text })}
                    />

                    <Text style={styles.label_addcase}>Relationship:</Text>
                    <TextInput
                        style={styles.input_addcase}
                        placeholder="Enter relationship"
                        value={familyMember.relation}
                        onChangeText={(text) => setFamilyMember({ ...familyMember, relation: text })}
                    />

                    <TouchableOpacity
                        style={styles.submitButtonText_addcase}
                        onPress={() => {
                            setCaseData({ ...caseData, familyMembers: [...caseData.familyMembers, familyMember] });
                            setFamilyMember({ name: "", relation: "" });
                        }}
                    >
                        <Text style={styles.submitBtnText_addcase}>Add Family Member</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.navbtnContainer_addcase}>
                {currentStep == "composition" && (
                    <TouchableOpacity
                        style={[styles.navButton_addcase, { alignSelf: "center" }]}
                        onPress={() => setCurrentStep((prev) => prev - 1)}
                    >
                        <Text style={styles.navBtnText_addcase}>Next</Text>
                    </TouchableOpacity>
                )}
                {currentStep == "composition" && (
                    <TouchableOpacity
                        style={[styles.navButton_addcase, { alignSelf: "center" }]}
                        onPress={() => setCurrentStep((prev) => prev - 1)}
                    >
                        <Text style={styles.navBtnText_addcase}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
            {currentStep === "family" && (
                <TouchableOpacity style={styles.submitButtonText_addcase} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText_addcase}>Submit Case</Text>
                </TouchableOpacity>
            )}
        </View>

    );
};

export default AddCase;
