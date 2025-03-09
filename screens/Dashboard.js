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
import Header from "../components/Header";
import Footer from "../components/Footer";
import { styles } from "../components/styles";

const Dashboard = () => {

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <Header title="Daily Planner" />

      <View style={styles.OverallDashBoardView_BecauseYouNeedAnOverAllViewForFutureReferenceBryant_BelowTheHeader}>


      </View>


      {/* Footer */}
      <View style={styles.footerContainerWrapper}>
        <Footer currentScreen="Cases" />
      </View>
    </View>
  );
};


export default Dashboard;
