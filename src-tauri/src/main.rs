// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use image::{DynamicImage, GenericImageView};
fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    blur,
    brighten,
    crop,
    rotate,
    invert,
    ascii_art,
    fractal
  ])
    .run(tauri::generate_context!())
    .expect("error while running the application");
}

#[tauri::command]
fn blur(_infile: String, _outfile: String, _blur_amt: f32) {
  let img = image::open(_infile).expect("Failed to open INFILE.");
  let img2 = img.blur(_blur_amt);

  img2.save(_outfile).expect("Failed writing OUTFILE.");
}

#[tauri::command]
fn brighten(_infile: String, _outfile: String, _value: i32) {
  let img = image::open(_infile).expect("Couldn't open image");
  let img2 = img.brighten(_value);

  img2.save(_outfile).expect("Couldn't save image");
}

#[tauri::command]
fn crop(_infile: String, _outfile: String, _x: u32, _y: u32, _width: u32, _height: u32) {
  let mut img = image::open(_infile).expect("Can't open image");
  let img2 = img.crop(_x, _y, _width, _height);

  img2.save(_outfile).unwrap();
}

#[tauri::command]
fn rotate(_infile: String, _outfile: String, _rotation_value: u32) {
  let img = image::open(_infile).expect("Can't open image");
  let mut img2: DynamicImage;

  if _rotation_value == 90 {
     img2 = img.rotate90();
  } else if _rotation_value == 180 {
      img2 = img.rotate180();
  } else if _rotation_value == 270 {
      img2 = img.rotate270();
  } else {
      println!("Invalid rotation value ( choose either 90 or 180 or 270 )");
      std::process::exit(1);
  }

  img2.save(_outfile).expect("Couldn't save image");
}

#[tauri::command]
fn invert(_infile: String, _outfile: String) {
  let mut img = image::open(_infile).expect("Can't open image");

  img.invert();
  img.save(_outfile).unwrap();
}

#[tauri::command]
// helper function

fn get_str_ascii(intent :u8)-> &'static str{
  let index = intent/32;
  let ascii = [" ",".",",","-","~","+","=","@"];
  return ascii[index as usize];
}

#[tauri::command]
fn ascii_art(dir: &str, scale: u32){
  let img = image::open(dir).unwrap();
  println!("{:?}", img.dimensions());
  let (width,height) = img.dimensions();
  for y in 0..height{
      for x in 0..width{
          if y % (scale * 2) == 0 && x % scale ==0{
              let pix = img.get_pixel(x,y);
              let mut intent = pix[0]/3 + pix[1]/3 + pix[2]/3;
              if pix[3] ==0{
                  intent = 0;
              }
              print!("{}",get_str_ascii(intent));
          } 
      }
      if y%(scale*2)==0{
          println!("");
      }
  }
}

#[tauri::command]
fn fractal(_outfile: String) {
  let width = 800;
  let height = 800;

  let mut imgbuf = image::ImageBuffer::new(width, height);

  let scale_x = 3.0 / width as f32;
  let scale_y = 3.0 / height as f32;

  // Iterate over the coordinates and pixels of the image
  for (x, y, pixel) in imgbuf.enumerate_pixels_mut() {
      // Use red and blue to be a pretty gradient background
      let red = (0.3 * x as f32) as u8;
      let blue = (0.3 * y as f32) as u8;

      // Use green as the fractal foreground (here is the fractal math part)
      let cx = y as f32 * scale_x - 1.5;
      let cy = x as f32 * scale_y - 1.5;

      let c = num_complex::Complex::new(-0.4, 0.6);
      let mut z = num_complex::Complex::new(cx, cy);

      let mut green = 0;
      while green < 255 && z.norm() <= 2.0 {
          z = z * z + c;
          green += 1;
      }

      *pixel = image::Rgb([red, green, blue]);
  }

  imgbuf.save(_outfile).unwrap();
}
