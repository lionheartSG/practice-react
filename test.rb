require 'pry-byebug'

def bmi(weight, height)
  mass = weight/(height.to_f * 2)
  binding.pry
  if mass <= 18.5
    'Underweight'
  elsif mass <= 25.0
    'Normal'
  elsif mass <= 30.0
    'Overweight'
  else
    'Obese'
  end
end

puts bmi(50, 1.5)
