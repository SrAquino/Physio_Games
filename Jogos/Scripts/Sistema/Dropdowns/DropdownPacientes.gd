extends OptionButton

var file: File
var filePath: String = "res://ArquivosDoSistema/Pacientes.txt"

func _ready():
	file = File.new()
	
	if file.file_exists(filePath) and file.open(filePath, File.READ) == OK:
		self.add_item("Selecione o paciente")
		while !file.eof_reached():
			var line = file.get_line()
			self.add_item(line)
		file.close()
	else:
		print("Não foi possível abrir o arquivo.")
		
