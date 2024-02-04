import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import { Skeleton } from "@rneui/themed";
import { ChangePasswordForm, InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";
import { map } from "lodash";
import { Modal } from "../../../components";
import { ChangeEmailForm } from "../../../components/Account";
import { ChangeDescriptionForm } from "../../../components/Account/ChangeDescriptionForm/ChangeDescriptionForm";
import { ChangeEducationForm } from "../../../components/Account/ChangeEducationForm/ChangeEducationForm";
import { ChangeAvalaibilityForm } from "../../../components/Account/ChangeAvalaibilityForm/ChangeAvalaibilityForm";
import { ChangeInterestsForm } from "../../../components/Account/ChangeInterestsForm/ChangeInterestsForm";
import { ChangePhoneForm } from "../../../components/Account/ChangePhoneForm/ChangePhoneForm";
import { where, query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils";
import { ChangeCvForm } from "../../../components/Account/ChangeCvForm/ChangeCvForm";
import { PdfRead } from "../../../components/Shared/PdfRead/PdfRead";

export function UserLoggedScreen({ idUser }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const currentUser = getAuth().currentUser;
  const onReload = () => setReload((prev) => !prev);
  const onCloseOpenModal = () => setShowModal((prev) => !prev);
  const [isModalVisible, setModalVisible] = useState(false);
  const [textLoading, setTextLoading] = useState(true);

  useEffect(() => {
    if (idUser != null) {
      const q = query(
        collection(db, "usersInfo"),
        where("idUser", "==", idUser)
      );
      onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setUserInfo(snapshot.docs[0].data());
          setTextLoading(false);
        }
      });
    }
  }, [idUser]);

  const Logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const selectedComponent = (key) => {
    if (key === "cv") {
      setRenderComponent(
        <ChangeCvForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }
    if (key === "description") {
      setRenderComponent(
        <ChangeDescriptionForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "education") {
      setRenderComponent(
        <ChangeEducationForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "avalaibility") {
      setRenderComponent(
        <ChangeAvalaibilityForm
          onClose={onCloseOpenModal}
          onReload={onReload}
        />
      );
    }

    if (key === "interest") {
      setRenderComponent(
        <ChangeInterestsForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "phone") {
      setRenderComponent(
        <ChangePhoneForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "email") {
      setRenderComponent(
        <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "password") {
      setRenderComponent(
        <ChangePasswordForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }
    onCloseOpenModal();
  };
  function getMenuOptions(selectedComponent) {
    return [
      {
        title: "Sobre mí",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.description,
        onPress: () => selectedComponent("description"),
      },
      {
        title: "Educación",
        iconType: "material-community",
        iconNameLeft: "school",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.education,
        onPress: () => selectedComponent("education"),
      },
      {
        title: "Disponibilidad",
        iconType: "material-community",
        iconNameLeft: "timer-sand",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.availaibility,
        onPress: () => selectedComponent("avalaibility"),
      },
      {
        title: "Intereses",
        iconType: "material-community",
        iconNameLeft: "cards-playing-heart-multiple",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.interests,
        onPress: () => selectedComponent("interest"),
      },
      {
        title: "Teléfono",
        iconType: "material-community",
        iconNameLeft: "phone",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.phone,
        onPress: () => selectedComponent("phone"),
      },
      {
        title: "Email",
        iconType: "material-community",
        iconNameLeft: "gmail",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: userInfo.email,
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Contraseña",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        text: "*********",
        onPress: () => selectedComponent("password"),
      },
    ];
  }

  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <ScrollView>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <PdfRead
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        cv={userInfo.cv}
        fileName={"tomassosa"}
      />

      <View style={styles.content}>
        <Button
          title="Ver curriculum"
          buttonStyle={styles.btnCv}
          titleStyle={styles.btnTextCv}
          icon={
            <Icon
              type="material-community"
              name="file-document-multiple-outline"
              color="#fff"
            />
          }
          onPress={() => setModalVisible((prev) => !prev)}
        />
        {idUser === currentUser.uid && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => selectedComponent("cv")}
          >
            <View style={styles.circle}>
              <Icon
                type="material-community"
                name="pencil"
                color="#fff"
                size={20}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{menu.title}</ListItem.Title>
            {textLoading ? (
              <Skeleton
                height={20}
                skeletonStyle={{ backgroundColor: "#ccc" }}
              />
            ) : (
              <Text>
                {menu.text ? (
                  menu.text
                ) : currentUser.uid == userInfo.idUser ? (
                  <Text style={styles.inputMessage}>
                    Aún no terminaste de configurar tu perfil!
                  </Text>
                ) : (
                  <Text style={styles.inputMessage}>
                    No hay nada para ver aquí
                  </Text>
                )}
              </Text>
            )}
          </ListItem.Content>
          {idUser === currentUser.uid && (
            <Icon
              type={menu.iconType}
              name={"square-edit-outline"}
              color={menu.iconColorRight}
              onPress={menu.onPress}
            />
          )}
        </ListItem>
      ))}

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={Logout}
      />

      <LoadingModal show={loading} text={loadingText} />
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </ScrollView>
  );
}
