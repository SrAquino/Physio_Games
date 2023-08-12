extends Button

#Cena Main:
func _on_Iniciar_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginFisio.tscn")

func _on_Sair_pressed():
	get_tree().quit()  # Isso fecha o jogo
#----------

#Cena Login/Registro de Fisioterapeuta
func _on_novo_Registro_F_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroFisio.tscn")

func _on_Registrar_F_pressed():
	var nomeF: LineEdit = get_node("/root/Background/LineEdit")
	createTextFile("res://ArquivosDoSistema/Fisioterapeutas.txt",nomeF.text)
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginPaciente.tscn")

func _on_Entrar_F_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginPaciente.tscn")
#-------------------------------------

#Cena Login/Registro de Paciente
func _on_novo_Registro_P_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroPaciente.tscn")
	
func _on_Registrar_P_pressed():
	var nomeP: LineEdit = get_node("/root/Background/LineEdit")
	createTextFile("res://ArquivosDoSistema/Pacientes.txt",nomeP.text)
	
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
	
func _on_Entrar_P_pressed():
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
#-------------------------------

#Cena de Seleção de jogo
func _on_Ini_Jogo_pressed():
	var selected_index = get_node("/root/Background").jogoSelecionado
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

