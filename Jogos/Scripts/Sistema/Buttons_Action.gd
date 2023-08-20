extends Control

func _ready():
# warning-ignore:return_value_discarded
	Firebase.Auth.connect("signup_succeeded", self, "_on_FirebaseAuth_signup_succeeded")
# warning-ignore:return_value_discarded
	Firebase.Auth.connect("signup_failed", self, "on_signup_failed")
# warning-ignore:return_value_discarded
	Firebase.Auth.connect("login_succeeded", self, "login_succeeded")
# warning-ignore:return_value_discarded
	Firebase.Auth.connect("login_failed", self, "login_failed")

#Cena Main:
func _on_Iniciar_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginFisio.tscn")

func _on_Sair_pressed():
	get_tree().quit()  # Isso fecha o jogo
#---------------------------------------------------------------------------

#Cena Login/Registro de Fisioterapeuta
func _on_novo_Registro_F_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroFisio.tscn")

func _on_Registrar_F_pressed():
	var emailF = $Background/Email.text
	var senhaF = $Background/Senha.text
	
	Firebase.Auth.signup_with_email_and_password(emailF, senhaF)

func _on_FirebaseAuth_signup_succeeded(auth_info):
	var emailF = $Background/Email.text
	createTextFile("res://ArquivosDoSistema/Fisioterapeutas.txt",emailF)
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginPaciente.tscn")
	
func on_signup_failed(error_code, message):
	#print("error code: " + str(error_code))
	$Background/messageError.text = message
	
func _on_Entrar_F_pressed():
	Firebase.Auth.login_with_email_and_password($Background/DropdownFisios.text,$Background/Senha.text)

func login_succeeded(auth_info: Dictionary):
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginPaciente.tscn")
	#print("LOGIN SUCESSO!!!!!!!!!!!!!!!!!!!!!!!!!")

func login_failed(code, message: String):
	$Background/messageError.text = message
	#print("Erro: " + str(code))
#-------------------------------------

#Cena Login/Registro de Paciente
func _on_novo_Registro_P_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroPaciente.tscn")
	
func _on_Registrar_P_pressed():
	var nomeP = $Background/LineEdit.text
	createTextFile("res://ArquivosDoSistema/Pacientes.txt",nomeP)
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
	
func _on_Entrar_P_pressed():
	if $Background/DropdownPacientes.text != "Selecione o paciente":
		Global.paciente_atual = $Background/DropdownPacientes.text
		FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
#-------------------------------

#Cena de Seleção de jogo
func _on_Ini_Jogo_pressed():
	var selected_index = $Background.jogoSelecionado
	if selected_index == 0:
		pass
	elif selected_index == 1:
		FadeTransitions.fade_in("res://Cenas/Jogo1.tscn")
	
func createTextFile(filePath: String, content: String):
	var file = File.new()
	if file.file_exists(filePath):
		if file.open(filePath, File.READ_WRITE) == OK:
			var existingContent = file.get_as_text()
			existingContent += "\n" + content
			file.store_string(existingContent)
			file.close()
			print("Conteúdo adicionado ao arquivo existente.")
		else:
			print("Não foi possível abrir o arquivo para edição.")
	else:
		if file.open(filePath, File.WRITE) == OK:
			file.store_string(content)
			file.close()
			print("Arquivo de texto criado com sucesso!")
		else:
			print("Não foi possível criar o arquivo de texto.")



func _on_esqueciSenha_pressed():
	var email = $Background/DropdownFisios.text
	Firebase.Auth.send_password_reset_email(email)
